// Transparent rule-based weighted scoring. NOT a trained machine-learning model.
export const WEIGHTS = { rainfall: 0.25, landslide: 0.2, flood: 0.15, incidents: 0.15, history: 0.1, roadCondition: 0.1, traffic: 0.05 };
export const FACTOR_LABELS = { rainfall: "Rainfall", landslide: "Landslide risk", flood: "Flood risk", incidents: "Incident reports", history: "Historical disruptions", roadCondition: "Road condition", traffic: "Traffic" };
const SCALE = 1.6; // maps the weighted sum (max 100) onto a practical 0..99 range

export const riskLevel = (pct) => (pct >= 75 ? "CRITICAL" : pct >= 55 ? "HIGH" : pct >= 30 ? "MEDIUM" : "LOW");
export const overallAccess = (d) => Math.round((d.access.road + d.access.emergency + d.access.hospital + d.access.supplies) / 4);

/** Score one route. `overrides` lets the simulator (later stage) add factor boosts, e.g. { rainfall: 0.3 } */
export function scoreRoute(route, overrides = {}) {
  const contributions = Object.keys(WEIGHTS)
    .map((key) => {
      const value = Math.min(1, (route.factors[key] ?? 0) + (overrides[key] ?? 0));
      return { key, label: FACTOR_LABELS[key], value, points: value * WEIGHTS[key] * 100 };
    })
    .sort((a, b) => b.points - a.points);
  const risk = Math.min(99, Math.round(contributions.reduce((s, c) => s + c.points, 0) * SCALE));
  return {
    routeId: route.id, name: route.name, corridor: route.corridor, distanceKm: route.distanceKm,
    risk, level: riskLevel(risk), accessibility: Math.max(0, 100 - Math.round(risk * 0.9)),
    etaMin: route.baseTimeMin + Math.round(route.baseTimeMin * (risk / 100) * 0.5),
    contributions, drivers: contributions.slice(0, 2).map((c) => c.label),
  };
}

export const scoreRoutes = (routes, overrides = {}) => routes.map((r) => scoreRoute(r, overrides));

/** Plain-language insights generated from the scores. */
export function buildInsights(scored, districts) {
  const out = [];
  const worst = [...scored].sort((a, b) => b.risk - a.risk)[0];
  if (worst) out.push({ id: "worst", tone: worst.level, text: `${worst.name} carries the highest disruption risk (${worst.risk}%), driven mainly by ${worst.drivers.join(" and ").toLowerCase()}.` });
  const alt = scored.filter((r) => worst && r.routeId !== worst.routeId && r.risk < worst.risk).sort((a, b) => a.risk - b.risk)[0];
  if (worst && alt) out.push({ id: "alt", tone: "LOW", text: `${alt.name} is ${worst.risk - alt.risk} points lower in risk and may serve as an alternative if ${worst.name} degrades.` });
  const weak = districts.map((d) => ({ ...d, overall: overallAccess(d) })).sort((a, b) => a.overall - b.overall)[0];
  if (weak) out.push({ id: "access", tone: "MEDIUM", text: `${weak.name} has the lowest overall accessibility (${weak.overall}%). Emergency access is its weakest dimension at ${weak.access.emergency}%.` });
  return out;
}
