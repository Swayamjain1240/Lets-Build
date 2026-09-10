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

import ProjectFormFields from "../../components/project/ProjectFormFields.jsx";
import ProjectDetailSkeleton from "../../components/project/ProjectDetailSkeleton.jsx";

import useProjectDetails from "../../hooks/useProjectDetails.js";
import useProjectForm from "../../hooks/useProjectForm.js";
import useAuth from "../../hooks/useAuth.js";

import {
  updateProject,
} from "../../services/projectService.js";

import {
  toProjectForm,
} from "../../utils/projectPayload.js";

const getId = (value) =>
  String(
    typeof value === "object"
      ? value?._id || ""
      : value || ""
  );

export default function EditProject() {
  const { id } = useParams();

  const {
    project,
    loading,
    error,
  } = useProjectDetails(id);

  if (loading) {
    return <ProjectDetailSkeleton />;
  }

  if (error || !project) {
    return (
      <Navigate
        to={`/projects/${id}`}
        replace
      />
    );
  }

  return (
    <EditProjectForm
      key={project._id}
      project={project}
    />
  );
}

function EditProjectForm({
  project,
}) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isOwner =
    getId(project.owner) ===
    getId(user?._id);

  const form = useProjectForm({
    initialValues:
      toProjectForm(project),

    saveProject: (payload) =>
      updateProject(
        project._id,
        payload
      ),
  });

  if (!isOwner) {
    return (
      <Navigate
        to={`/projects/${project._id}`}
        replace
      />
    );
  }

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const response =
      await form.submit();

    if (!response) return;

    navigate(
      `/projects/${project._id}`,
      { replace: true }
    );
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to={`/projects/${project._id}`}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-heading"
      >
        <ArrowLeft size={16} />
        Back to project
      </Link>

      <header className="mt-5">
        <p className="text-sm font-medium text-brand-400">
          Project settings
        </p>

        <h1 className="mt-2 text-3xl font-bold text-heading">
          Edit project
        </h1>

        <p className="mt-3 text-sm text-muted">
          Update your private project
          information and requirements.
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
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
            {form.formError}
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border-soft pt-6 sm:flex-row sm:justify-end">
          <Link
            to={`/projects/${project._id}`}
            className="rounded-xl border border-border px-5 py-2.5 text-center text-sm font-medium text-heading hover:bg-background"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={form.saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
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