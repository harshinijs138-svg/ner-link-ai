import DemoBadge from "./DemoBadge.jsx";
export default function Panel({ title, subtitle, demo = true, action, children, className = "" }) {
  return (
    <section className={`rounded-md border border-line bg-panel ${className}`}>
      <header className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">{demo && <DemoBadge />}{action}</div>
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}
