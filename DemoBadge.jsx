import { DATA_LABEL } from "../data/demoData.js";
export default function DemoBadge({ label = DATA_LABEL }) {
  return (
    <span title="Illustrative values, not from a live government feed"
      className="inline-flex items-center whitespace-nowrap rounded border border-warn/40 bg-warn/10 px-2 py-0.5 text-[11px] font-medium text-warn">
      {label}
    </span>
  );
}
