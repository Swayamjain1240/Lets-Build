import {
  Inbox,
  RefreshCw,
  Send,
} from "lucide-react";

import RequestCard from "./RequestCard.jsx";
import RequestActions from "./RequestActions.jsx";
import RequestSkeleton from "./RequestSkeleton.jsx";

export default function RequestList({
  requests = [],
  loading = false,
  error = "",
  mode = "received",
  processingRequestId = "",
  processingAction = "",
  onRetry,
  onAccept,
  onReject,
}) {
  if (loading) {
    return (
      <RequestSkeleton cards={4} />
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-10 text-center">
        <h2 className="font-semibold text-heading">
          Unable to load requests
        </h2>

        <p className="mt-2 text-sm text-muted">
          {error}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mx-auto mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  }

  if (requests.length === 0) {
    const Icon =
      mode === "sent"
        ? Send
        : Inbox;

    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-10 text-center">
        <Icon
          size={30}
          className="mx-auto text-muted"
        />

        <h2 className="mt-4 font-semibold text-heading">
          No {mode} requests
        </h2>

        <p className="mt-2 text-sm text-muted">
          {mode === "received"
            ? "New join requests and invitations will appear here."
            : "Requests and invitations you send will appear here."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {requests.map((request) => {
        const processing =
          request._id ===
          processingRequestId;

        return (
          <RequestCard
            key={request._id}
            request={request}
            mode={mode}
          >
            {mode ===
              "received" && (
              <RequestActions
                request={request}
                action={
                  processing
                    ? processingAction
                    : ""
                }
                onAccept={onAccept}
                onReject={onReject}
              />
            )}
          </RequestCard>
        );
      })}
    </div>
  );
}