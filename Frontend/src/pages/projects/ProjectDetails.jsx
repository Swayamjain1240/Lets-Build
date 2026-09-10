import {
  RefreshCw,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useState } from "react";

import ProjectHeader from "../../components/project/ProjectHeader.jsx";
import ProjectOverview from "../../components/project/ProjectOverview.jsx";
import ProjectTeamPreview from "../../components/project/ProjectTeamPreview.jsx";
import ProjectDetailSkeleton from "../../components/project/ProjectDetailSkeleton.jsx";

import useProjectDetails from "../../hooks/useProjectDetails.js";
import useAuth from "../../hooks/useAuth.js";

import {
  deleteProject,
} from "../../services/projectService.js";

const getId = (value) =>
  String(
    typeof value === "object"
      ? value?._id || ""
      : value || ""
  );

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    project,
    loading,
    error,
    refresh,
  } = useProjectDetails(id);

  const [deleting, setDeleting] =
    useState(false);

  const [deleteError, setDeleteError] =
    useState("");

  if (loading) {
    return <ProjectDetailSkeleton />;
  }

  if (error || !project) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-10 text-center">
        <h2 className="font-semibold text-heading">
          Project unavailable
        </h2>

        <p className="mt-2 text-sm text-muted">
          {error ||
            "Project could not be found."}
        </p>

        <button
          type="button"
          onClick={refresh}
          className="mx-auto mt-5 flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  }

  const isOwner =
    getId(project.owner) ===
    getId(user?._id);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete "${project.title}"? This action cannot be undone.`
    );

    if (!confirmed || deleting) {
      return;
    }

    setDeleting(true);
    setDeleteError("");

    try {
      await deleteProject(project._id);

      navigate("/projects", {
        replace: true,
      });
    } catch (err) {
      setDeleteError(
        err.response?.data?.message ||
          "Unable to delete project."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-5">
      <ProjectHeader
        project={project}
        isOwner={isOwner}
        deleting={deleting}
        onDelete={handleDelete}
      />

      {deleteError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
          {deleteError}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <ProjectOverview
          project={project}
        />

        <ProjectTeamPreview
          project={project}
        />
      </div>
    </div>
  );
}