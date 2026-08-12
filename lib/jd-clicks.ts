import { createHash, createSign, randomUUID } from "node:crypto";

/**
 * Click tracking for the job-description links, stored in Firestore.
 *
 * Two collections:
 *   jd_click_counts/{slug}  — running totals, cheap for the dashboard to read
 *   jd_clicks/{id}          — one document per click, for referrer / unique counts
 *
 * Every function here fails soft. If Firestore is not configured or is having a
 * bad day we log and move on: losing a click stat must never break the redirect
 * or the admin page.
 */

const FIRESTORE_SCOPE = "https://www.googleapis.com/auth/datastore";
const COUNTS_COLLECTION = "jd_click_counts";
const EVENTS_COLLECTION = "jd_clicks";

export interface JdClickInput {
  slug: string;
  referrer: string | null;
  userAgent: string | null;
  /** Raw client IP; only ever stored as a salted hash */
  ip: string | null;
}

export interface JdClickCount {
  slug: string;
  total: number;
  unique: number;
  lastClickAt: string | null;
}

export interface JdClickEvent {
  slug: string;
  clickedAt: string | null;
  referrer: string | null;
  visitorHash: string | null;
}

export interface JdClickStats {
  configured: boolean;
  counts: JdClickCount[];
  recent: JdClickEvent[];
  /** Set when configured is false: exactly which env var is wrong */
  configProblem?: string;
  error?: string;
}

/** Cheap, deliberately conservative bot check — we only want to skip the obvious ones. */
const BOT_PATTERN =
  /bot|crawler|spider|crawling|slurp|preview|facebookexternalhit|slackbot|twitterbot|discordbot|whatsapp|telegrambot|linkedinbot|bingpreview|headless|lighthouse|pingdom|curl|wget|python-requests|axios|monitor/i;

export function isLikelyBot(userAgent: string | null): boolean {
  if (!userAgent) return true;
  return BOT_PATTERN.test(userAgent);
}

function getProjectId(): string | null {
  return (
    process.env.FIRESTORE_PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.GOOGLE_PROJECT_ID ||
    null
  );
}

function getCredentials(): { client_email: string; private_key: string } | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed.client_email && parsed.private_key) {
        return {
          client_email: parsed.client_email,
          // Vercel env vars keep newlines as literal \n
          private_key: String(parsed.private_key).replace(/\\n/g, "\n"),
        };
      }
    } catch {
      console.warn("jd-clicks: GOOGLE_SERVICE_ACCOUNT_KEY is not valid JSON");
      return null;
    }
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (email && key) {
    return { client_email: email, private_key: key.replace(/\\n/g, "\n") };
  }

  return null;
}

export function isClickTrackingConfigured(): boolean {
  return Boolean(getProjectId() && getCredentials());
}

/**
 * Why tracking is switched off, in enough detail to fix it. "Not configured"
 * on its own sends you hunting through three different possible causes.
 */
export function describeConfigProblem(): string | null {
  const projectId = getProjectId();
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!projectId && !raw) {
    return "Neither FIRESTORE_PROJECT_ID nor GOOGLE_SERVICE_ACCOUNT_KEY is set.";
  }

  if (!projectId) {
    return "FIRESTORE_PROJECT_ID is missing or empty.";
  }

  if (!raw) {
    return "GOOGLE_SERVICE_ACCOUNT_KEY is missing or empty. If you built .env.local with jq, check that jq is actually installed — a missing jq writes an empty value with no error.";
  }

  try {
    const parsed = JSON.parse(raw);
    const missing = ["client_email", "private_key"].filter((field) => !parsed[field]);
    if (missing.length > 0) {
      return `GOOGLE_SERVICE_ACCOUNT_KEY parsed as JSON but has no ${missing.join(" or ")}. Is it the whole service account key file?`;
    }
  } catch {
    return `GOOGLE_SERVICE_ACCOUNT_KEY is not valid JSON (starts with "${raw.slice(0, 12)}…", ${raw.length} chars). It must be the entire key file on one line, with no surrounding quotes.`;
  }

  return null;
}

function base64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

/** Cache the token in module scope; it is valid for an hour. */
let cachedToken: { value: string; expiresAt: number } | null = null;

/**
 * Mint a Google access token from the service account key.
 *
 * Signs the JWT with node:crypto and exchanges it at the OAuth endpoint, rather
 * than pulling in google-auth-library for one call.
 */
async function getAccessToken(): Promise<string | null> {
  const credentials = getCredentials();
  if (!credentials) return null;

  // Reuse while there is more than a minute left
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const issuedAt = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: credentials.client_email,
      scope: FIRESTORE_SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      iat: issuedAt,
      exp: issuedAt + 3600,
    }),
  );

  try {
    const signature = createSign("RSA-SHA256")
      .update(`${header}.${claims}`)
      .sign(credentials.private_key)
      .toString("base64url");

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: `${header}.${claims}.${signature}`,
      }),
    });

    if (!response.ok) {
      console.error(`jd-clicks: token exchange failed (${response.status})`, await response.text());
      return null;
    }

    const body = (await response.json()) as { access_token?: string; expires_in?: number };
    if (!body.access_token) return null;

    cachedToken = {
      value: body.access_token,
      expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000,
    };
    return cachedToken.value;
  } catch (error) {
    console.error("jd-clicks: could not mint an access token", error);
    return null;
  }
}

/**
 * Resource name prefix, as it must appear in a document's `name` field.
 * Not a URL: Firestore rejects a commit whose name starts with https://.
 */
function documentsPath(projectId: string): string {
  return `projects/${projectId}/databases/(default)/documents`;
}

/** The same thing as a REST endpoint, for fetch. */
function documentsUrl(projectId: string): string {
  return `https://firestore.googleapis.com/v1/${documentsPath(projectId)}`;
}

/**
 * Salted hash of IP + user agent. Lets us count unique visitors without ever
 * storing an IP address. Falls back to the request id when there is no IP.
 */
function hashVisitor(ip: string | null, userAgent: string | null): string {
  const salt = process.env.CLICK_HASH_SALT || "suis-jd-clicks";
  return createHash("sha256")
    .update(`${salt}:${ip ?? "unknown"}:${userAgent ?? "unknown"}`)
    .digest("hex")
    .slice(0, 16);
}

/**
 * Record one click. Writes the event document and bumps the per-role counter in
 * a single atomic commit.
 */
export async function recordJdClick(input: JdClickInput): Promise<void> {
  const projectId = getProjectId();
  if (!projectId) return;

  const token = await getAccessToken();
  if (!token) return;

  const visitorHash = hashVisitor(input.ip, input.userAgent);
  const eventId = `${input.slug}-${Date.now()}-${randomUUID().slice(0, 8)}`;
  const path = documentsPath(projectId);

  const writes = [
    {
      // Event document — the full record of this click
      update: {
        name: `${path}/${EVENTS_COLLECTION}/${eventId}`,
        fields: {
          slug: { stringValue: input.slug },
          referrer: input.referrer ? { stringValue: input.referrer } : { nullValue: null },
          visitorHash: { stringValue: visitorHash },
        },
      },
      updateTransforms: [{ fieldPath: "clickedAt", setToServerValue: "REQUEST_TIME" }],
    },
    {
      // Counter document — created on first click thanks to the empty update mask
      update: {
        name: `${path}/${COUNTS_COLLECTION}/${input.slug}`,
        fields: {},
      },
      updateMask: { fieldPaths: [] as string[] },
      updateTransforms: [
        { fieldPath: "total", increment: { integerValue: "1" } },
        { fieldPath: "lastClickAt", setToServerValue: "REQUEST_TIME" },
      ],
    },
  ];

  try {
    const response = await fetch(`${documentsUrl(projectId)}:commit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ writes }),
    });

    if (!response.ok) {
      console.error(`jd-clicks: commit failed (${response.status})`, await response.text());
    }
  } catch (error) {
    console.error("jd-clicks: commit threw", error);
  }
}

interface FirestoreDocument {
  name?: string;
  fields?: Record<string, Record<string, unknown>>;
}

function readString(doc: FirestoreDocument, field: string): string | null {
  const value = doc.fields?.[field];
  if (!value) return null;
  if (typeof value.stringValue === "string") return value.stringValue;
  if (typeof value.timestampValue === "string") return value.timestampValue;
  return null;
}

function readInt(doc: FirestoreDocument, field: string): number {
  const value = doc.fields?.[field];
  if (!value) return 0;
  if (typeof value.integerValue === "string") return Number.parseInt(value.integerValue, 10) || 0;
  if (typeof value.integerValue === "number") return value.integerValue;
  return 0;
}

async function listDocuments(
  base: string,
  token: string,
  collection: string,
  query: string = "",
): Promise<FirestoreDocument[]> {
  const response = await fetch(`${base}/${collection}${query}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  // An empty collection 404s in some cases; treat that as "no data yet"
  if (response.status === 404) return [];
  if (!response.ok) {
    throw new Error(`Firestore list ${collection} failed (${response.status}): ${await response.text()}`);
  }

  const body = (await response.json()) as { documents?: FirestoreDocument[] };
  return body.documents ?? [];
}

/** Everything the admin dashboard needs, in one call. */
export async function getJdClickStats(recentLimit = 25): Promise<JdClickStats> {
  const projectId = getProjectId();
  const credentials = getCredentials();

  if (!projectId || !credentials) {
    return {
      configured: false,
      counts: [],
      recent: [],
      configProblem: describeConfigProblem() ?? undefined,
    };
  }

  const token = await getAccessToken();
  if (!token) {
    return { configured: true, counts: [], recent: [], error: "Could not authenticate with Firestore." };
  }

  const base = documentsUrl(projectId);

  try {
    const [countDocs, eventDocs] = await Promise.all([
      listDocuments(base, token, COUNTS_COLLECTION),
      // pageSize is generous rather than exact: we sort and slice below
      listDocuments(base, token, EVENTS_COLLECTION, "?pageSize=300"),
    ]);

    const events: JdClickEvent[] = eventDocs.map((doc) => ({
      slug: readString(doc, "slug") ?? "unknown",
      clickedAt: readString(doc, "clickedAt"),
      referrer: readString(doc, "referrer"),
      visitorHash: readString(doc, "visitorHash"),
    }));

    events.sort((a, b) => (b.clickedAt ?? "").localeCompare(a.clickedAt ?? ""));

    const uniquesBySlug = new Map<string, Set<string>>();
    for (const event of events) {
      if (!event.visitorHash) continue;
      if (!uniquesBySlug.has(event.slug)) uniquesBySlug.set(event.slug, new Set());
      uniquesBySlug.get(event.slug)!.add(event.visitorHash);
    }

    const counts: JdClickCount[] = countDocs.map((doc) => {
      const slug = doc.name?.split("/").pop() ?? "unknown";
      return {
        slug,
        total: readInt(doc, "total"),
        unique: uniquesBySlug.get(slug)?.size ?? 0,
        lastClickAt: readString(doc, "lastClickAt"),
      };
    });

    return { configured: true, counts, recent: events.slice(0, recentLimit) };
  } catch (error) {
    console.error("jd-clicks: could not read stats", error);
    return {
      configured: true,
      counts: [],
      recent: [],
      error: error instanceof Error ? error.message : "Unknown Firestore error.",
    };
  }
}
