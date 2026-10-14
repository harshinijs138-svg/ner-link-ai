import { Link } from "react-router-dom";
export default function StagePlaceholder({ title, stage }) {
  return (
    <div className="mx-auto max-w-md rounded-md border border-dashed border-line p-10 text-center">
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-muted">This module is scheduled for {stage} and is not built yet.</p>
      <Link to="/app" className="mt-4 inline-block rounded border border-line px-3 py-1.5 text-sm hover:border-primary">Back to Overview</Link>
    </div>
  );
}
