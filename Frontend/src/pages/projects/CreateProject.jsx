import {
  ArrowLeft,
  Plus,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import ProjectFormFields from "../../components/project/ProjectFormFields.jsx";

import useProjectForm from "../../hooks/useProjectForm.js";

import {
  createProject,
} from "../../services/projectService.js";

export default function CreateProject() {
  const navigate = useNavigate();

  const form = useProjectForm({
    saveProject: createProject,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await form.submit();

    if (!response) return;

    const project =
      response.data?.project ||
      response.data;

    const projectId =
      project?._id || project?.id;

    navigate(
      projectId
        ? `/projects/${projectId}`
        : "/projects",
      { replace: true }
    );
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-heading"
      >
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      <header className="mt-5">
        <p className="text-sm font-medium text-brand-400">
          New workspace
        </p>

        <h1 className="mt-2 text-3xl font-bold text-heading">
          Create a project
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted">
          Define your idea and the skills needed to build it.
          Your project description stays private.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-7 rounded-2xl border border-border bg-surface p-6"
      >
        <ProjectFormFields
          formData={form.formData}
          errors={form.errors}
          onChange={form.change}
          disabled={form.saving}
        />

        {form.formError && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400"
          >
            {form.formError}
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border-soft pt-6 sm:flex-row sm:justify-end">
          <Link
            to="/projects"
            className="rounded-xl border border-border px-5 py-2.5 text-center text-sm font-medium text-heading hover:bg-background"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={form.saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={17} />

            {form.saving
              ? "Creating..."
              : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}