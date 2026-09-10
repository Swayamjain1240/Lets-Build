import {
  ArrowLeft,
  Save,
} from "lucide-react";

import {
  Link,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

import RecruitmentFormFields from "../../components/recruitment/RecruitmentFormFields.jsx";
import RecruitmentDetailSkeleton from "../../components/recruitment/RecruitmentDetailSkeleton.jsx";

import useRecruitmentDetails from "../../hooks/useRecruitmentDetails.js";
import useRecruitmentForm from "../../hooks/useRecruitmentForm.js";
import useProjects from "../../hooks/useProjects.js";
import useAuth from "../../hooks/useAuth.js";

import {
  updateRecruitment,
} from "../../services/recruitmentService.js";

import {
  toRecruitmentForm,
} from "../../utils/recruitmentPayload.js";

const getId = (value) =>
  String(
    typeof value === "object"
      ? value?._id || ""
      : value || ""
  );

export default function EditRecruitment() {
  const { id } = useParams();

  const {
    recruitment,
    loading,
    error,
  } = useRecruitmentDetails(id);

  if (loading) {
    return (
      <RecruitmentDetailSkeleton />
    );
  }

  if (error || !recruitment) {
    return (
      <Navigate
        to={`/recruitments/${id}`}
        replace
      />
    );
  }

  return (
    <EditRecruitmentForm
      key={recruitment._id}
      recruitment={recruitment}
    />
  );
}

function EditRecruitmentForm({
  recruitment,
}) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    projects,
    loading: projectsLoading,
  } = useProjects();

  const projectOwner =
    typeof recruitment.project ===
    "object"
      ? recruitment.project?.owner
      : null;

  const isOwner =
    getId(projectOwner) ===
    getId(user?._id);

  const ownedProjects =
    projects.filter(
      (project) =>
        getId(project.owner) ===
        getId(user?._id)
    );

  const form =
    useRecruitmentForm({
      initialValues:
        toRecruitmentForm(
          recruitment
        ),

      saveRecruitment: (
        payload
      ) =>
        updateRecruitment(
          recruitment._id,
          payload
        ),
    });

  if (!isOwner) {
    return (
      <Navigate
        to={`/recruitments/${recruitment._id}`}
        replace
      />
    );
  }

  if (projectsLoading) {
    return (
      <RecruitmentDetailSkeleton />
    );
  }

  const selectedExists =
    ownedProjects.some(
      (project) =>
        project._id ===
        form.formData.project
    );

  const projectOptions =
    selectedExists
      ? ownedProjects
      : [
          recruitment.project,
          ...ownedProjects,
        ].filter(
          (project) =>
            typeof project ===
            "object"
        );

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      const response =
        await form.submit();

      if (!response) return;

      navigate(
        `/recruitments/${recruitment._id}`,
        { replace: true }
      );
    };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to={`/recruitments/${recruitment._id}`}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-heading"
      >
        <ArrowLeft size={16} />
        Back to recruitment
      </Link>

      <header className="mt-5">
        <p className="text-sm font-medium text-brand-400">
          Recruitment settings
        </p>

        <h1 className="mt-2 text-3xl font-bold text-heading">
          Edit recruitment
        </h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-7 rounded-2xl border border-border bg-surface p-6"
      >
        <RecruitmentFormFields
          formData={
            form.formData
          }
          errors={form.errors}
          projects={
            projectOptions
          }
          onChange={form.change}
          disabled={form.saving}
        />

        {form.formError && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
            {form.formError}
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border-soft pt-6 sm:flex-row sm:justify-end">
          <Link
            to={`/recruitments/${recruitment._id}`}
            className="rounded-xl border border-border px-5 py-2.5 text-center text-sm font-medium text-heading hover:bg-background"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={form.saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            <Save size={17} />

            {form.saving
              ? "Saving..."
              : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}