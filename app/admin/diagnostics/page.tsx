import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { diagnoseJdClicks } from "@/lib/jd-clicks";

export const dynamic = "force-dynamic";

const COUNTS_LABEL = "jd_click_counts";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 border-b border-gray-100 py-2 last:border-0">
      <span className="w-40 shrink-0 text-sm text-gray-500">{label}</span>
      <span className="flex-1 break-all font-mono text-sm text-gray-800">{value}</span>
    </div>
  );
}

function verdict(status: number): string {
  if (status === 200) return "OK";
  if (status === 401) return "token rejected";
  if (status === 403) return "permission denied — service account needs Cloud Datastore User";
  if (status === 404) return "not found — the (default) database or project does not exist";
  if (status === 400) return "bad request — payload rejected";
  return "unexpected";
}

export default async function DiagnosticsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const diag = await diagnoseJdClicks();

  return (
    <div className="min-h-screen bg-[#fefdf9] px-4 py-10 text-[#2f2f2f]">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-[#2144c0]">Firestore diagnostics</h1>
          <p className="mt-1 text-sm text-gray-600">
            Runs a real read and a real write and reports exactly what Firestore returned. The write goes to a
            throwaway <code className="rounded bg-gray-100 px-1">jd_click_diagnostics</code> collection, so it does
            not affect the click counts.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg">
          <Row label="Project ID" value={diag.projectId ?? "(not set)"} />
          <Row label="Service account" value={diag.clientEmail ?? "(no credentials)"} />
          <Row label="Config problem" value={diag.configProblem ?? "none"} />
          <Row label="Access token" value={diag.tokenOk ? "minted OK" : "FAILED — see server logs"} />
        </div>

        {diag.read && (
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Read {COUNTS_LABEL} — {diag.read.status} {verdict(diag.read.status)}
            </h2>
            <pre className="mt-3 overflow-x-auto rounded bg-gray-50 p-3 text-xs leading-relaxed text-gray-700">
              {diag.read.body || "(empty body)"}
            </pre>
          </div>
        )}

        {diag.write && (
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Write commit — {diag.write.status} {verdict(diag.write.status)}
            </h2>
            <pre className="mt-3 overflow-x-auto rounded bg-gray-50 p-3 text-xs leading-relaxed text-gray-700">
              {diag.write.body || "(empty body)"}
            </pre>
          </div>
        )}

        <Link href="/admin" className="inline-block text-sm text-[#2144c0] hover:underline">
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}
