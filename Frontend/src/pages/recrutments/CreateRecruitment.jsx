import {
  ArrowLeft,
  Send,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import RecruitmentFormFields from "../../components/recruitment/RecruitmentFormFields.jsx";
import ProjectSkeleton from "../../components/project/ProjectSkeleton.jsx";

import useRecruitmentForm from "../../hooks/useRecruitmentForm.js";
import useProjects from "../../hooks/useProjects.js";
import useAuth from "../../hooks/useAuth.js";

import {
  createRecruitment,
} from "../../services/recruitmentService.js";

const getId = (value) =>
  String(
    typeof value === "object"
      ? value?._id || ""
      : value || ""
  );

export default function CreateRecruitment() {
  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  const {
    projects,
    loading,
    error,
  } = useProjects();

  const ownedProjects =
    projects.filter(
      (project) =>
        getId(project.owner) ===
        getId(user)
    );

  const form =
    useRecruitmentForm({
      saveRecruitment:
        createRecruitment,
    });

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const response =
      await form.submit();

    if (!response) return;

    const recruitment =
      response.data?.recruitment ||
      response.data;

    const recruitmentId =
      recruitment?._id ||
      recruitment?.id;

    navigate(
      recruitmentId
        ? `/recruitments/${recruitmentId}`
        : "/recruitments",
      { replace: true }
    );
  };

  if (loading) {
    return (
      <ProjectSkeleton
        cards={3}
      />
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <h2 className="font-semibold text-heading">
          Unable to load your projects
        </h2>

        <p className="mt-2 text-sm text-muted">
          {error}
        </p>
      </div>
    );
  }

  if (
    ownedProjects.length === 0
  ) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-surface p-8 text-center">
        <h2 className="text-xl font-semibold text-heading">
          Create a project first
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted">
          Recruitment can only be
          published for a project that
          you own.
        </p>

        <Link
          to="/projects/new"
          className="mt-5 inline-flex rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white"
        >
          Create Project
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/recruitments"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-heading"
      >
        <ArrowLeft size={16} />
        Back to recruitments
      </Link>

      <header className="mt-5">
        <p className="text-sm font-medium text-brand-400">
          Public opportunity
        </p>

        <h1 className="mt-2 text-3xl font-bold text-heading">
          Create recruitment
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted">
          Publish a safe public summary
          without exposing your private
          project description.
        </p>
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
            ownedProjects
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
            to="/recruitments"
            className="rounded-xl border border-border px-5 py-2.5 text-center text-sm font-medium text-heading hover:bg-background"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={form.saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            <Send size={16} />

            {form.saving
              ? "Publishing..."
              : "Publish Recruitment"}
          </button>
        </div>
      </form>
    </div>
  );
}