import { RefreshCw } from "lucide-react";

import ProjectCard from "./ProjectCard.jsx";
import ProjectSkeleton from "./ProjectSkeleton.jsx";
import ProjectEmptyState from "./ProjectEmptyState.jsx";

export default function ProjectGrid({
  projects = [],
  loading = false,
  error = "",
  onRetry,
  filtered = false,
  onClear,
}) {
  if (loading) {
    return <ProjectSkeleton cards={6} />;
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-border bg-surface p-10 text-center"
      >
        <h2 className="font-semibold text-heading">
          Unable to load projects
        </h2>

        <p className="mt-2 text-sm text-muted">
          {error}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <ProjectEmptyState
        filtered={filtered}
        onClear={onClear}
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
        />
      ))}
    </div>
  );
}