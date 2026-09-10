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
import ProjectTeam from "../../components/project/ProjectTeam.jsx";
import ProjectDetailSkeleton from "../../components/project/ProjectDetailSkeleton.jsx";

import useProjectDetails from "../../hooks/useProjectDetails.js";
import useAuth from "../../hooks/useAuth.js";

import {
  deleteProject,
  removeProjectMember,
} from "../../services/projectService.js";

const getId = (value) => {
  if (!value) return "";

  const actualValue =
    value.user || value;

  return String(
    actualValue?._id ||
      actualValue?.id ||
      actualValue ||
      ""
  );
};

export default function ProjectDetails() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  const {
    project,
    loading,
    error,
    refresh,
  } = useProjectDetails(id);

  const [deleting, setDeleting] =
    useState(false);

  const [
    removingMemberId,
    setRemovingMemberId,
  ] = useState("");

  const [actionError, setActionError] =
    useState("");

  if (loading) {
    return (
      <ProjectDetailSkeleton />
    );
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
    getId(user);

  const handleDelete = async () => {
    if (deleting) return;

    const confirmed =
      window.confirm(
        `Delete "${project.title}"? This action cannot be undone.`
      );

    if (!confirmed) return;

    setDeleting(true);
    setActionError("");

    try {
      await deleteProject(
        project._id
      );

      navigate(
        "/projects",
        { replace: true }
      );
    } catch (err) {
      setActionError(
        err.response?.data?.message ||
          "Unable to delete project."
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleRemoveMember =
    async (member) => {
      const memberId =
        getId(member);

      if (!memberId) return;

      const confirmed =
        window.confirm(
          `Remove ${member.name || "this member"} from the project?`
        );

      if (!confirmed) return;

      setRemovingMemberId(
        memberId
      );

      setActionError("");

      try {
        await removeProjectMember(
          project._id,
          memberId
        );

        await refresh();
      } catch (err) {
        setActionError(
          err.response?.data?.message ||
            "Unable to remove team member."
        );
      } finally {
        setRemovingMemberId("");
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

      {actionError && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400"
        >
          {actionError}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
        <ProjectOverview
          project={project}
        />

        <ProjectTeam
          project={project}
          isOwner={isOwner}
          removingMemberId={
            removingMemberId
          }
          onRemoveMember={
            handleRemoveMember
          }
        />
      </div>
    </div>
  );
}