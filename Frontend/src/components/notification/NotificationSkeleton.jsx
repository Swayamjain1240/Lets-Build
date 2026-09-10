export default function NotificationSkeleton({
  items = 5,
}) {
  const count = Math.min(
    Math.max(items, 1),
    10
  );

  return (
    <div
      role="status"
      aria-label="Loading notifications"
      className="space-y-3"
    >
      {Array.from({
        length: count,
      }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse gap-4 rounded-xl border border-border bg-surface p-4 motion-reduce:animate-none"
        >
          <div className="h-10 w-10 shrink-0 rounded-full bg-surface-soft" />

          <div className="flex-1 space-y-3">
            <div className="h-3 w-3/4 rounded bg-surface-soft" />

            <div className="h-3 w-1/2 rounded bg-surface-soft" />

            <div className="h-2.5 w-20 rounded bg-surface-soft" />
          </div>
        </div>
      ))}
    </div>
  );
}