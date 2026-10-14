import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Map, Route, Truck, Package, Accessibility, Bell, ClipboardList, BarChart3, FlaskConical, Settings, User } from "lucide-react";
import DemoBadge from "../components/DemoBadge.jsx";
import { useAppState } from "../context/AppState.jsx";

const NAV = [
  ["/app", "Overview", LayoutDashboard], ["/app/map", "Live Map", Map], ["/app/routes", "Route Intelligence", Route],
  ["/app/vehicles", "Vehicles", Truck], ["/app/logistics", "Logistics", Package], ["/app/accessibility", "Accessibility", Accessibility],
  ["/app/alerts", "Alerts", Bell], ["/app/reports", "Field Reports", ClipboardList], ["/app/analytics", "Analytics", BarChart3],
  ["/app/simulation", "Simulation", FlaskConical], ["/app/settings", "Settings", Settings],
];

export default function AppShell() {
  const { data, derived, error } = useAppState();
  const alerts = derived?.criticalAlerts ?? 0;
  return (
    <div className="flex h-full flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-panel focus:p-2">Skip to content</a>
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-surface px-4">
        <div className="flex items-baseline gap-3">
          <span className="text-base font-bold tracking-tight">NER-LINK <span className="text-primary">AI</span></span>
          <span className="hidden text-xs text-muted sm:inline">Operations Intelligence</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="region">Region</label>
          <select id="region" className="hidden rounded border border-line bg-panel px-2 py-1 text-xs text-slate-200 md:block" defaultValue="all">
            <option value="all">All NER states</option><option value="assam">Assam</option><option value="meghalaya">Meghalaya</option>
          </select>
          <span className="hidden sm:inline"><DemoBadge /></span>
          <span className="hidden items-center gap-1.5 text-xs text-muted sm:flex" role="status">
            <span className={`h-2 w-2 rounded-full ${error ? "bg-danger" : "bg-ok"}`} />{error ? "Data unavailable" : "Systems nominal"}
          </span>
          <button className="relative rounded p-1.5 text-muted hover:text-slate-50" aria-label={`Notifications, ${alerts} critical`}>
            <Bell size={18} />{data && alerts > 0 && <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-danger" />}
          </button>
          <div className="flex items-center gap-2 border-l border-line pl-3 text-xs text-muted"><User size={16} /><span className="hidden lg:inline">Operations Admin</span></div>
        </div>
      </header>
      <div className="flex min-h-0 flex-1">
        <nav aria-label="Primary" className="w-14 shrink-0 overflow-y-auto border-r border-line bg-surface py-2 md:w-56">
          {NAV.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} end={to === "/app"} title={label}
              className={({ isActive }) => `flex items-center gap-3 border-l-2 px-4 py-2.5 text-sm transition-colors ${isActive ? "border-primary bg-primary/10 text-primary" : "border-transparent text-muted hover:bg-white/5 hover:text-slate-50"}`}>
              <Icon size={18} aria-hidden /><span className="hidden md:inline">{label}</span>
            </NavLink>
          ))}
        </nav>
        <main id="main" className="min-w-0 flex-1 overflow-y-auto p-4 md:p-6"><Outlet /></main>
      </div>
    </div>
  );
}
