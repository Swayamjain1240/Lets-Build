import {
  useMemo,
  useState,
} from "react";

import {
  FolderKanban,
  Plus,
  RefreshCw,
} from "lucide-react";

import { Link } from "react-router-dom";

import ProjectGrid from "../../components/project/ProjectGrid.jsx";
import useProjects from "../../hooks/useProjects.js";

import {
  PROJECT_STATUS_OPTIONS,
} from "../../utils/projectValidation.js";

export default function Projects() {
  const {
    projects,
    loading,
    error,
    refresh,
  } = useProjects();

  const [status, setStatus] = useState("");

  const filteredProjects = useMemo(() => {
    return projects
      .filter(
        (project) =>
          !status ||
          project.status === status
      )
      .sort(
        (a, b) =>
          (new Date(b.updatedAt).getTime() || 0) -
          (new Date(a.updatedAt).getTime() || 0)
      );
  }, [projects, status]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-400">
            Your workspaces
          </p>

          <h1 className="mt-2 text-3xl font-bold text-heading">
            My Projects
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted">
            Manage the projects you own or collaborate on.
          </p>
        </div>

        <Link
          to="/projects/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Plus size={18} />
          Create Project
        </Link>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted">
          <FolderKanban size={17} />

          {!loading && !error && (
            <span>
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1
                ? "project"
                : "projects"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            aria-label="Filter by status"
            className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-heading outline-none"
          >
            <option value="">All statuses</option>

            {PROJECT_STATUS_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            aria-label="Refresh projects"
            className="rounded-xl border border-border p-2.5 text-muted hover:bg-surface hover:text-heading disabled:opacity-40"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <ProjectGrid
        projects={filteredProjects}
        loading={loading}
        error={error}
        onRetry={refresh}
        filtered={Boolean(status)}
        onClear={() => setStatus("")}
      />
    </div>
  );
}