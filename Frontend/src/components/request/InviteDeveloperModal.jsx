import {
  Send,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

import useCreateRequest from "../../hooks/useCreateRequest.js";

import {
  buildInvitationPayload,
  validateRequestTarget,
} from "../../utils/requestPayload.js";

export default function InviteDeveloperModal({
  developer,
  projects = [],
  onClose,
  onSuccess,
}) {
  const [projectId, setProjectId] =
    useState("");

  const [message, setMessage] =
    useState("");

  const {
    submitting,
    error,
    submitRequest,
  } = useCreateRequest();

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      const validationError =
        validateRequestTarget({
          projectId,
          receiverId:
            developer?._id,
        });

      if (validationError) {
        return;
      }

      const payload =
        buildInvitationPayload({
          projectId,
          receiverId:
            developer._id,
          message,
        });

      const response =
        await submitRequest(payload);

      if (!response) return;

      onSuccess?.(response);
    };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-developer-title"
    >
      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-brand-400">
              Project invitation
            </p>

            <h2
              id="invite-developer-title"
              className="mt-1 text-xl font-semibold text-heading"
            >
              Invite{" "}
              {developer?.name ||
                "developer"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg p-2 text-muted hover:bg-background hover:text-heading"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <div>
            <label
              htmlFor="invite-project"
              className="text-sm font-medium text-heading"
            >
              Project
            </label>

            <select
              id="invite-project"
              value={projectId}
              onChange={(event) =>
                setProjectId(
                  event.target.value
                )
              }
              disabled={submitting}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-heading outline-none focus:border-brand-500/50"
            >
              <option value="">
                Select project
              </option>

              {projects.map(
                (project) => (
                  <option
                    key={project._id}
                    value={project._id}
                  >
                    {project.title}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label
              htmlFor="invite-message"
              className="text-sm font-medium text-heading"
            >
              Message
              <span className="ml-1 text-muted">
                (optional)
              </span>
            </label>

            <textarea
              id="invite-message"
              value={message}
              onChange={(event) =>
                setMessage(
                  event.target.value
                )
              }
              disabled={submitting}
              rows={4}
              placeholder="Tell the developer why you'd like them on the project..."
              className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-heading outline-none placeholder:text-muted focus:border-brand-500/50"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400"
            >
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-border-soft pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-xl border border-border px-4 py-2.5 text-sm text-heading"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                submitting ||
                !projectId
              }
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              <Send size={16} />

              {submitting
                ? "Sending..."
                : "Send Invitation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}