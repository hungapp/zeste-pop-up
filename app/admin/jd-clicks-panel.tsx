import { getJdClickStats } from "@/lib/jd-clicks";
import { JOB_ROLES } from "@/lib/jd-roles";

function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatReferrer(value: string | null): string {
  if (!value) return "direct";
  try {
    const url = new URL(value);
    return url.hostname.replace(/^www\./, "") + url.pathname.replace(/\/$/, "");
  } catch {
    return value;
  }
}

export default async function JdClicksPanel() {
  const stats = await getJdClickStats();

  if (!stats.configured) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h3 className="font-semibold text-amber-900">Click tracking not configured</h3>
        {stats.configProblem && (
          <p className="mt-2 rounded bg-amber-100 p-3 font-mono text-xs leading-relaxed text-amber-900">
            {stats.configProblem}
          </p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-amber-800">
          Job description clicks are recorded in Firestore. It needs{" "}
          <code className="rounded bg-amber-100 px-1">FIRESTORE_PROJECT_ID</code> and{" "}
          <code className="rounded bg-amber-100 px-1">GOOGLE_SERVICE_ACCOUNT_KEY</code> in the environment. Restart the
          dev server after editing <code className="rounded bg-amber-100 px-1">.env.local</code> — Next only reads it at
          boot. Until then the JD links still work, they just aren&apos;t counted.
        </p>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h3 className="font-semibold text-red-900">Could not read click stats</h3>
        <p className="mt-2 text-sm text-red-800">{stats.error}</p>
      </div>
    );
  }

  // Show every role, including the ones nobody has clicked yet
  const bySlug = new Map(stats.counts.map((count) => [count.slug, count]));
  const rows = JOB_ROLES.map((role) => ({
    title: role.title,
    slug: role.slug,
    total: bySlug.get(role.slug)?.total ?? 0,
    unique: bySlug.get(role.slug)?.unique ?? 0,
    lastClickAt: bySlug.get(role.slug)?.lastClickAt ?? null,
  })).sort((a, b) => b.total - a.total);

  const grandTotal = rows.reduce((sum, row) => sum + row.total, 0);
  const titleBySlug = new Map(JOB_ROLES.map((role) => [role.slug, role.title]));

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl bg-white shadow-lg">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 text-right font-medium">Clicks</th>
              <th className="px-6 py-3 text-right font-medium">Unique</th>
              <th className="px-6 py-3 text-right font-medium">Last click</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.slug}>
                <td className="px-6 py-3 font-medium text-gray-800">{row.title}</td>
                <td className="px-6 py-3 text-right tabular-nums text-gray-800">{row.total}</td>
                <td className="px-6 py-3 text-right tabular-nums text-gray-500">{row.unique}</td>
                <td className="px-6 py-3 text-right text-gray-500">{formatDate(row.lastClickAt)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t border-gray-200 bg-gray-50">
            <tr>
              <td className="px-6 py-3 text-xs uppercase tracking-wide text-gray-500">Total</td>
              <td className="px-6 py-3 text-right font-semibold tabular-nums text-gray-800">{grandTotal}</td>
              <td colSpan={2} />
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-lg">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Recent clicks</h3>
        {stats.recent.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">No clicks recorded yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-gray-100 text-sm">
            {stats.recent.map((event, index) => (
              <li key={`${event.slug}-${event.clickedAt}-${index}`} className="flex items-baseline gap-3 py-2">
                <span className="w-40 shrink-0 font-medium text-gray-800">
                  {titleBySlug.get(event.slug) ?? event.slug}
                </span>
                <span className="flex-1 truncate text-gray-500">{formatReferrer(event.referrer)}</span>
                <span className="shrink-0 text-gray-400">{formatDate(event.clickedAt)}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-xs leading-relaxed text-gray-400">
          Obvious bots and link-preview crawlers are skipped. &ldquo;Unique&rdquo; counts distinct visitors by a salted
          hash of IP and browser, so it undercounts people on shared networks and overcounts anyone switching devices.
        </p>
      </div>
    </div>
  );
}
