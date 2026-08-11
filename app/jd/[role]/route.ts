import { after, type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { findRole } from "@/lib/jd-roles";
import { isLikelyBot, recordJdClick } from "@/lib/jd-clicks";

/**
 * Tracked redirect to a job description.
 *
 * The 307 is returned immediately; the Firestore write happens in after(), so a
 * slow (or broken) database never delays the applicant.
 */
export async function GET(request: NextRequest, context: { params: Promise<{ role: string }> }) {
  const { role: slug } = await context.params;
  const role = findRole(slug);

  if (!role) {
    return NextResponse.redirect(new URL("/careers", request.url), 307);
  }

  const userAgent = request.headers.get("user-agent");

  if (!isLikelyBot(userAgent)) {
    after(async () => {
      await recordJdClick({
        slug: role.slug,
        referrer: request.headers.get("referer"),
        userAgent,
        ip:
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip") ||
          null,
      });
    });
  }

  return NextResponse.redirect(role.jdUrl, 307);
}
