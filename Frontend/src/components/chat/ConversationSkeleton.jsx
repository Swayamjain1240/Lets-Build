export default function ConversationSkeleton({
  items = 6,
}) {
  const count = Math.min(
    Math.max(items, 1),
    10
  );

  return (
    <div
      role="status"
      aria-label="Loading conversations"
      className="space-y-2"
    >
      {Array.from({
        length: count,
      }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse gap-3 rounded-xl p-4 motion-reduce:animate-none"
        >
          <div className="h-11 w-11 shrink-0 rounded-full bg-surface-soft" />

          <div className="min-w-0 flex-1">
            <div className="flex justify-between gap-3">
              <div className="h-3.5 w-28 rounded bg-surface-soft" />

              <div className="h-2.5 w-10 rounded bg-surface-soft" />
            </div>

            <div className="mt-3 h-3 w-3/4 rounded bg-surface-soft" />

            <div className="mt-3 h-2.5 w-24 rounded bg-surface-soft" />
          </div>
        </div>
      ))}
    </div>
  );
}