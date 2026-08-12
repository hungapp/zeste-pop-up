import { generateKeyPairSync } from "node:crypto";

/**
 * Guards the Firestore write payload. A document's `name` must be a bare
 * resource name; sending the REST URL there fails the commit with a 400 while
 * reads keep working, so the dashboard silently shows zeros.
 */

const { privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
});

const PROJECT_ID = "suis-test";

interface CapturedCall {
  url: string;
  body: Record<string, unknown>;
}

let calls: CapturedCall[];

beforeEach(() => {
  jest.resetModules();
  calls = [];

  process.env.FIRESTORE_PROJECT_ID = PROJECT_ID;
  process.env.GOOGLE_SERVICE_ACCOUNT_KEY = JSON.stringify({
    client_email: "svc@suis-test.iam.gserviceaccount.com",
    private_key: privateKey,
  });

  global.fetch = jest.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const raw = init?.body ? String(init.body) : "";
    // The token request is form-encoded; only the commit sends JSON.
    calls.push({ url, body: raw.startsWith("{") ? JSON.parse(raw) : {} });

    if (url.includes("oauth2.googleapis.com")) {
      return new Response(JSON.stringify({ access_token: "test-token", expires_in: 3600 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response("{}", { status: 200, headers: { "Content-Type": "application/json" } });
  }) as unknown as typeof fetch;
});

function commitCall(): CapturedCall {
  const call = calls.find((c) => c.url.includes(":commit"));
  if (!call) throw new Error(`no commit call; saw ${calls.map((c) => c.url).join(", ")}`);
  return call;
}

test("commit posts to the documents:commit endpoint", async () => {
  const { recordJdClick } = await import("@/lib/jd-clicks");
  await recordJdClick({ slug: "barista", referrer: null, userAgent: "Chrome", ip: "1.2.3.4" });

  expect(commitCall().url).toBe(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:commit`,
  );
});

test("document names are resource names, not URLs", async () => {
  const { recordJdClick } = await import("@/lib/jd-clicks");
  await recordJdClick({ slug: "barista", referrer: null, userAgent: "Chrome", ip: "1.2.3.4" });

  const writes = commitCall().body.writes as Array<{ update: { name: string } }>;
  expect(writes).toHaveLength(2);

  for (const write of writes) {
    expect(write.update.name).not.toMatch(/^https?:\/\//);
    expect(write.update.name).toMatch(
      new RegExp(`^projects/${PROJECT_ID}/databases/\\(default\\)/documents/[^/]+/.+$`),
    );
  }

  expect(writes[1].update.name).toBe(
    `projects/${PROJECT_ID}/databases/(default)/documents/jd_click_counts/barista`,
  );
});

test("the counter write increments total", async () => {
  const { recordJdClick } = await import("@/lib/jd-clicks");
  await recordJdClick({ slug: "baker", referrer: null, userAgent: "Chrome", ip: "1.2.3.4" });

  const writes = commitCall().body.writes as Array<{ updateTransforms?: unknown[] }>;
  expect(writes[1].updateTransforms).toContainEqual({
    fieldPath: "total",
    increment: { integerValue: "1" },
  });
});

test("bots are filtered before any write", async () => {
  const { isLikelyBot } = await import("@/lib/jd-clicks");
  expect(isLikelyBot("Slackbot-LinkExpanding 1.0")).toBe(true);
  expect(isLikelyBot(null)).toBe(true);
  expect(
    isLikelyBot(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    ),
  ).toBe(false);
});
