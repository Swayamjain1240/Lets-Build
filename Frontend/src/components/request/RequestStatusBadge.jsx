const STATUS_STYLES = {
  PENDING:
    "border-amber-500/20 bg-amber-500/10 text-amber-300",

  ACCEPTED:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",

  REJECTED:
    "border-red-500/20 bg-red-500/10 text-red-300",
};

const STATUS_LABELS = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

export default function RequestStatusBadge({
  status,
}) {
  const normalized =
    String(status || "")
      .toUpperCase();

  const styles =
    STATUS_STYLES[normalized] ||
    "border-border bg-surface-soft text-muted";

  const label =
    STATUS_LABELS[normalized] ||
    "Unknown";

  return (
    <span
      className={`
        inline-flex rounded-lg
        border px-2.5 py-1
        text-xs font-medium
        ${styles}
      `}
    >
      {label}
    </span>
  );
}