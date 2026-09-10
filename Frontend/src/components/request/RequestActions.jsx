import {
  Check,
  X,
} from "lucide-react";

export default function RequestActions({
  request,
  action = "",
  onAccept,
  onReject,
}) {
  const status =
    String(
      request?.status || ""
    ).toUpperCase();

  if (status !== "PENDING") {
    return null;
  }

  const accepting =
    action === "accept";

  const rejecting =
    action === "reject";

  const processing =
    accepting || rejecting;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() =>
          onReject?.(request)
        }
        disabled={processing}
        className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <X size={14} />

        {rejecting
          ? "Rejecting..."
          : "Reject"}
      </button>

      <button
        type="button"
        onClick={() =>
          onAccept?.(request)
        }
        disabled={processing}
        className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Check size={14} />

        {accepting
          ? "Accepting..."
          : "Accept"}
      </button>
    </div>
  );
}