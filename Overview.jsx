import { Truck, Package, Route, ShieldAlert, BellRing, MapPinOff, CloudRain } from "lucide-react";
import { useAppState } from "../context/AppState.jsx";
import KpiCard from "../components/KpiCard.jsx";
import Panel from "../components/Panel.jsx";
import { Skeleton, SkeletonRows, RiskBadge, ProgressBar, EmptyState, ErrorState } from "../components/ui.jsx";
import { overallAccess, riskLevel } from "../services/aiService.js";
import { fmtDuration, LEVEL_STYLE, SEVERITY_STYLE } from "../utils/format.js";

const STATUSES = ["In Transit", "Delivered", "Delayed", "At Risk", "Disrupted"];
const STATUS_TONE = { "In Transit": "LOW", Delivered: "LOW", Delayed: "MEDIUM", "At Risk": "HIGH", Disrupted: "CRITICAL" };
const SEV_LEVEL = { High: "HIGH", Medium: "MEDIUM", Low: "LOW" };

export default function Overview() {
  const { data, derived, loading, error, reload } = useAppState();
  if (error) return <ErrorState message={String(error.message ?? error)} onRetry={reload} />;
  const ready = !loading && data && derived;

  const kpis = ready ? [
    ["Active Vehicles", data.vehicles.length, "Simulated GPS feed", Truck],
    ["Active Deliveries", derived.activeDeliveries, `${data.deliveries.length} tracked in total`, Package],
    ["Accessible Routes", derived.accessibleRoutes, `of ${derived.scored.length} monitored`, Route],
    ["At-Risk Routes", derived.atRiskRoutes, "High or critical risk", ShieldAlert, derived.atRiskRoutes ? "HIGH" : undefined],
    ["Critical Alerts", derived.criticalAlerts, "Need acknowledgement", BellRing, derived.criticalAlerts ? "CRITICAL" : undefined],
    ["Affected Locations", derived.affectedLocations, "Overall access below 65%", MapPinOff, derived.affectedLocations ? "MEDIUM" : undefined],
  ] : [];

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Regional operations overview</h1>
          <p className="text-sm text-muted">Route risk, deliveries and accessibility across monitored corridors.</p>
        </div>
        {ready && (
          <div className="flex items-center gap-2 rounded border border-line bg-panel px-3 py-1.5 text-xs text-muted">
            <CloudRain size={14} className="text-primary" aria-hidden />{data.weather.summary}: {data.weather.rainfallMm24h} mm in 24h (simulated)
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {ready ? kpis.map(([label, value, hint, icon, tone]) => <KpiCard key={label} label={label} value={value} hint={hint} icon={icon} tone={tone} />)
          : Array.from({ length: 6 }, (_, i) => <div key={i} className="rounded-md border border-line bg-panel p-4"><Skeleton className="h-3 w-20" /><Skeleton className="mt-3 h-8 w-12" /></div>)}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Route risk" subtitle="Rule-based weighted scoring (not a trained ML model)" className="lg:col-span-2">
          {!ready ? <SkeletonRows rows={4} /> : (
            <ul className="divide-y divide-line">
              {[...derived.scored].sort((a, b) => b.risk - a.risk).map((r) => (
                <li key={r.routeId} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 py-3">
                  <div><span className="text-sm font-medium">{r.name}</span><span className="ml-2 text-xs text-muted">{r.corridor}</span></div>
                  <RiskBadge level={r.level} pct={r.risk} />
                  <ProgressBar value={r.risk} level={r.level} label={`${r.name} disruption probability`} />
                  <span className="text-xs text-muted">ETA {fmtDuration(r.etaMin)}, {r.distanceKm} km</span>
                  <p className="col-span-2 text-xs text-muted">Main drivers: {r.drivers.join(", ")}. Accessibility {r.accessibility}%.</p>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="AI insights" subtitle="Generated from the risk scores and district data">
          {!ready ? <SkeletonRows rows={3} /> : derived.insights.length === 0 ? <EmptyState title="No insights yet" hint="Insights appear once route data is available." /> : (
            <ul className="space-y-3">
              {derived.insights.map((i) => (
                <li key={i.id} className={`border-l-2 pl-3 text-sm leading-relaxed text-slate-200 ${LEVEL_STYLE[i.tone].border}`}>{i.text}</li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Logistics status" subtitle="Deliveries by current status">
          {!ready ? <SkeletonRows rows={5} /> : (
            <ul className="space-y-3">
              {STATUSES.map((s) => {
                const n = data.deliveries.filter((d) => d.status === s).length;
                const pct = data.deliveries.length ? Math.round((n / data.deliveries.length) * 100) : 0;
                return (
                  <li key={s}>
                    <div className="mb-1 flex justify-between text-xs"><span>{s}</span><span className="tabular-nums text-muted">{n}</span></div>
                    <ProgressBar value={pct} level={STATUS_TONE[s]} label={`${s} deliveries`} />
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        <Panel title="Accessibility overview" subtitle="Average of road, emergency, hospital and supply access">
          {!ready ? <SkeletonRows rows={4} /> : (
            <ul className="space-y-3">
              {[...data.districts].sort((a, b) => overallAccess(a) - overallAccess(b)).map((d) => {
                const v = overallAccess(d);
                const level = riskLevel(100 - v);
                return (
                  <li key={d.id}>
                    <div className="mb-1 flex justify-between text-xs"><span>{d.name}</span><span className={`tabular-nums ${LEVEL_STYLE[level].text}`}>{v}%</span></div>
                    <ProgressBar value={v} level={level} label={`${d.name} accessibility`} />
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        <Panel title="Active alerts" subtitle="Most recent first">
          {!ready ? <SkeletonRows rows={3} /> : data.alerts.length === 0 ? <EmptyState title="No active alerts" hint="New alerts will appear here as conditions change." /> : (
            <ul className="space-y-3">
              {data.alerts.map((a) => (
                <li key={a.id} className="text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`rounded border px-1.5 py-0.5 text-[11px] font-medium ${SEVERITY_STYLE[a.severity].chip}`}>{a.severity}</span>
                    <span className="text-xs text-muted">{a.timestamp}</span>
                  </div>
                  <p className="mt-1 text-slate-200">{a.title}</p>
                  <p className="text-xs text-muted">{a.location}. {a.action}.</p>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <Panel title="Recent field reports" subtitle="Submitted by field officers (submission form arrives in a later stage)">
        {!ready ? <SkeletonRows rows={3} /> : data.incidents.length === 0 ? <EmptyState title="No field reports" hint="Reports from field officers will be listed here." /> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="text-xs text-muted"><tr><th className="pb-2 font-medium">Report</th><th className="pb-2 font-medium">Type</th><th className="pb-2 font-medium">Location</th><th className="pb-2 font-medium">Severity</th><th className="pb-2 font-medium">Submitted</th></tr></thead>
              <tbody className="divide-y divide-line">
                {data.incidents.map((i) => (
                  <tr key={i.id}>
                    <td className="py-2.5 tabular-nums">{i.id}</td><td>{i.type}</td><td className="text-muted">{i.location}</td>
                    <td><RiskBadge level={SEV_LEVEL[i.severity]} /></td><td className="text-muted">{i.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
