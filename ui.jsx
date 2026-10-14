import { AlertTriangle, Inbox } from "lucide-react";
import { LEVEL_STYLE } from "../utils/format.js";

export const Skeleton = ({ className = "h-4 w-full" }) => <div className={`skeleton ${className}`} aria-hidden />;

export const RiskBadge = ({ level, pct }) => (
  <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${LEVEL_STYLE[level].chip}`}>
    {pct != null ? `${pct}% ` : ""}{level}
  </span>
);

export const ProgressBar = ({ value, level = "LOW", label }) => (
  <div className="h-1.5 w-full rounded bg-line" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
    <div className={`h-1.5 rounded transition-all duration-500 ${LEVEL_STYLE[level].bar}`} style={{ width: `${value}%` }} />
  </div>
);

export const EmptyState = ({ title, hint }) => (
  <div className="flex flex-col items-center gap-2 py-8 text-center text-muted">
    <Inbox size={22} aria-hidden /><p className="text-sm text-slate-200">{title}</p><p className="max-w-xs text-xs">{hint}</p>
  </div>
);

export const ErrorState = ({ message, onRetry }) => (
  <div role="alert" className="flex flex-col items-center gap-3 rounded-md border border-danger/40 bg-danger/10 p-8 text-center">
    <AlertTriangle className="text-danger" size={22} aria-hidden />
    <p className="text-sm">Operations data could not be loaded. {message}</p>
    <button onClick={onRetry} className="rounded border border-line bg-panel px-3 py-1.5 text-sm hover:border-primary">Retry</button>
  </div>
);

export const SkeletonRows = ({ rows = 3 }) => (
  <div className="space-y-3">{Array.from({ length: rows }, (_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
);
