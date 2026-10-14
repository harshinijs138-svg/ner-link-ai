import { LEVEL_STYLE } from "../utils/format.js";
export default function KpiCard({ label, value, hint, icon: Icon, tone }) {
  const color = tone ? LEVEL_STYLE[tone].text : "text-slate-50";
  return (
    <div className="rounded-md border border-line bg-panel p-4">
      <div className="flex items-center justify-between text-muted">
        <span className="text-xs">{label}</span>{Icon && <Icon size={16} aria-hidden />}
      </div>
      <div className={`mt-2 text-3xl font-semibold tabular-nums ${color}`}>{value}</div>
      {hint && <div className="mt-1 text-xs text-muted">{hint}</div>}
    </div>
  );
}
