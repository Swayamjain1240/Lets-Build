import {
  Send,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

import useCreateRequest from "../../hooks/useCreateRequest.js";

import {
  buildJoinRequestPayload,
  validateRequestTarget,
} from "../../utils/requestPayload.js";

const getId = (value) =>
  String(
    typeof value === "object"
      ? value?._id || ""
      : value || ""
  );

export default function JoinRequestModal({
  recruitment,
  onClose,
  onSuccess,
}) {
  const [message, setMessage] =
    useState("");

  const {
    submitting,
    error,
    submitRequest,
  } = useCreateRequest();

  const project =
    typeof recruitment?.project ===
    "object"
      ? recruitment.project
      : null;

  const projectId =
    getId(project?._id);

  const ownerId =
    getId(project?.owner);

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      const validationError =
        validateRequestTarget({
          projectId,
          receiverId: ownerId,
        });

      if (validationError) {
        return;
      }

      const payload =
        buildJoinRequestPayload({
          projectId,
          receiverId: ownerId,
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
      aria-labelledby="join-request-title"
    >
      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-brand-400">
              Collaboration request
            </p>

            <h2
              id="join-request-title"
              className="mt-1 text-xl font-semibold text-heading"
            >
              Request to join
            </h2>

            {project?.title && (
              <p className="mt-2 text-sm text-muted">
                {project.title}
              </p>
            )}
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
          className="mt-6"
        >
          <label
            htmlFor="join-message"
            className="text-sm font-medium text-heading"
          >
            Message
            <span className="ml-1 text-muted">
              (optional)
            </span>
          </label>

          <textarea
            id="join-message"
            value={message}
            onChange={(event) =>
              setMessage(
                event.target.value
              )
            }
            disabled={submitting}
            rows={5}
            placeholder="Tell the project owner how you can contribute..."
            className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-heading outline-none placeholder:text-muted focus:border-brand-500/50"
          />

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400"
            >
              {error}
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-xl border border-border px-4 py-2.5 text-sm text-heading hover:bg-background"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                submitting ||
                !projectId ||
                !ownerId
              }
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              <Send size={16} />

              {submitting
                ? "Sending..."
                : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}