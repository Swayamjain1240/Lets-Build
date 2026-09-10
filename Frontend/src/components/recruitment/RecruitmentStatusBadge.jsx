export default function RecruitmentStatusBadge({
  isOpen,
}) {
  const styles = isOpen
    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
    : "border-border bg-surface-soft text-muted";

  return (
    <span
      className={`
        inline-flex items-center
        rounded-lg border
        px-2.5 py-1
        text-xs font-medium
        ${styles}
      `}
    >
      {isOpen ? "Open" : "Closed"}
    </span>
  );
}