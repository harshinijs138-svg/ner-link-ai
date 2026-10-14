export const fmtDuration = (min) => {
  if (!min) return "-";
  const h = Math.floor(min / 60), m = min % 60;
  return h ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`;
};
export const LEVEL_STYLE = {
  LOW: { text: "text-ok", bar: "bg-ok", border: "border-ok", chip: "border-ok/40 bg-ok/10 text-ok" },
  MEDIUM: { text: "text-warn", bar: "bg-warn", border: "border-warn", chip: "border-warn/40 bg-warn/10 text-warn" },
  HIGH: { text: "text-orange", bar: "bg-orange", border: "border-orange", chip: "border-orange/40 bg-orange/10 text-orange" },
  CRITICAL: { text: "text-danger", bar: "bg-danger", border: "border-danger", chip: "border-danger/40 bg-danger/10 text-danger" },
};
export const SEVERITY_STYLE = {
  CRITICAL: LEVEL_STYLE.CRITICAL, "HIGH PRIORITY": LEVEL_STYLE.HIGH,
  WARNING: LEVEL_STYLE.MEDIUM, INFO: { text: "text-primary", chip: "border-primary/40 bg-primary/10 text-primary" },
};
