import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./layouts/AppShell.jsx";
import Overview from "./pages/Overview.jsx";
import StagePlaceholder from "./pages/StagePlaceholder.jsx";

const pending = [
  ["map", "Live Map", "Stage 2"], ["vehicles", "Vehicles", "Stage 2"], ["routes", "Route Intelligence", "Stage 3"],
  ["simulation", "Simulation", "Stage 4"], ["accessibility", "Accessibility", "Stage 5"], ["alerts", "Alerts", "Stage 5"],
  ["reports", "Field Reports", "Stage 5"], ["logistics", "Logistics", "Stage 5"], ["analytics", "Analytics", "Stage 6"], ["settings", "Settings", "Stage 6"],
];

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app" replace />} />
      <Route path="/app" element={<AppShell />}>
        <Route index element={<Overview />} />
        {pending.map(([p, t, s]) => <Route key={p} path={p} element={<StagePlaceholder title={t} stage={s} />} />)}
      </Route>
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
}
