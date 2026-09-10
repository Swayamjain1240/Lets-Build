import {
  RefreshCw,
  Send,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useState,
} from "react";

import RecruitmentHeader from "../../components/recruitment/RecruitmentHeader.jsx";
import RecruitmentOverview from "../../components/recruitment/RecruitmentOverview.jsx";
import RecruitmentDetailSkeleton from "../../components/recruitment/RecruitmentDetailSkeleton.jsx";

import useRecruitmentDetails from "../../hooks/useRecruitmentDetails.js";
import useAuth from "../../hooks/useAuth.js";

import {
  deleteRecruitment,
  updateRecruitment,
} from "../../services/recruitmentService.js";

import {
  buildRecruitmentPayload,
  toRecruitmentForm,
} from "../../utils/recruitmentPayload.js";

const getId = (value) => {
  if (!value) return "";

  return String(
    typeof value === "object"
      ? value._id || value.id || ""
      : value
  );
};

export default function RecruitmentDetails() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  const {
    recruitment,
    loading,
    error,
    refresh,
  } = useRecruitmentDetails(id);

  const [managing, setManaging] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [actionError, setActionError] =
    useState("");

  if (loading) {
    return (
      <RecruitmentDetailSkeleton />
    );
  }

  if (error || !recruitment) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-10 text-center">
        <h2 className="font-semibold text-heading">
          Opportunity unavailable
        </h2>

        <p className="mt-2 text-sm text-muted">
          {error ||
            "Recruitment was not found."}
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

  const project =
    typeof recruitment.project ===
    "object"
      ? recruitment.project
      : null;

  const isOwner =
    getId(project?.owner) ===
    getId(user?._id);

  const handleToggleStatus =
    async () => {
      if (managing) return;

      setManaging(true);
      setActionError("");

      try {
        const formData =
          toRecruitmentForm(
            recruitment
          );

        const payload =
          buildRecruitmentPayload({
            ...formData,
            isOpen:
              !recruitment.isOpen,
          });

        await updateRecruitment(
          recruitment._id,
          payload
        );

        await refresh();
      } catch (err) {
        setActionError(
          err.response?.data?.message ||
            "Unable to update recruitment."
        );
      } finally {
        setManaging(false);
      }
    };

  const handleDelete =
    async () => {
      if (deleting) return;

      const confirmed =
        window.confirm(
          `Delete "${recruitment.title}"?`
        );

      if (!confirmed) return;

      setDeleting(true);
      setActionError("");

      try {
        await deleteRecruitment(
          recruitment._id
        );

        navigate(
          "/recruitments",
          { replace: true }
        );
      } catch (err) {
        setActionError(
          err.response?.data?.message ||
            "Unable to delete recruitment."
        );
      } finally {
        setDeleting(false);
      }
    };

  return (
    <div className="space-y-5">
      <RecruitmentHeader
        recruitment={recruitment}
        isOwner={isOwner}
        managing={managing}
        deleting={deleting}
        onToggleStatus={
          handleToggleStatus
        }
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

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <RecruitmentOverview
          recruitment={
            recruitment
          }
        />

        <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-semibold text-heading">
            Interested?
          </h2>

          {isOwner ? (
            <p className="mt-3 text-sm leading-6 text-muted">
              This recruitment belongs
              to one of your projects.
            </p>
          ) : recruitment.isOpen ? (
            <>
              <p className="mt-3 text-sm leading-6 text-muted">
                You can request to join
                this project if your
                skills match the
                opportunity.
              </p>

              <Link
                to="/requests"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white"
              >
                <Send size={16} />
                Request to Join
              </Link>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted">
              This recruitment is
              currently closed.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}