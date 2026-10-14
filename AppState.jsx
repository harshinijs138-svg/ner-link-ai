import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { routeService } from "../services/routeService.js";
import { vehicleService } from "../services/vehicleService.js";
import { logisticsService } from "../services/logisticsService.js";
import { incidentService } from "../services/incidentService.js";
import { accessibilityService } from "../services/accessibilityService.js";
import { alertService } from "../services/alertService.js";
import { weatherService } from "../services/weatherService.js";
import { scoreRoutes, buildInsights, overallAccess } from "../services/aiService.js";

const Ctx = createContext(null);

export function AppStateProvider({ children }) {
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true); setError(null);
    Promise.all([
      routeService.list(), vehicleService.list(), logisticsService.list(), incidentService.list(),
      accessibilityService.list(), alertService.list(), weatherService.current(),
    ])
      .then(([routes, vehicles, deliveries, incidents, districts, alerts, weather]) =>
        setRaw({ routes, vehicles, deliveries, incidents, districts, alerts, weather }))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const value = useMemo(() => {
    if (!raw) return { loading, error, reload: load, data: null, derived: null };
    const scored = scoreRoutes(raw.routes);
    const derived = {
      scored,
      insights: buildInsights(scored, raw.districts),
      activeDeliveries: raw.deliveries.filter((d) => d.status !== "Delivered").length,
      accessibleRoutes: scored.filter((r) => r.level === "LOW" || r.level === "MEDIUM").length,
      atRiskRoutes: scored.filter((r) => r.level === "HIGH" || r.level === "CRITICAL").length,
      criticalAlerts: raw.alerts.filter((a) => a.severity === "CRITICAL").length,
      affectedLocations: raw.districts.filter((d) => overallAccess(d) < 65).length,
    };
    return { loading, error, reload: load, data: raw, derived };
  }, [raw, loading, error, load]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAppState = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppState must be used inside AppStateProvider");
  return v;
};
