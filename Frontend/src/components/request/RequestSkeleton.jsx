export default function RequestSkeleton({
  cards = 4,
}) {
  const count = Math.min(
    Math.max(cards, 1),
    8
  );

  return (
    <div
      role="status"
      aria-label="Loading requests"
      className="grid gap-4 lg:grid-cols-2"
    >
      {Array.from({
        length: count,
      }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-border bg-surface p-5 motion-reduce:animate-none"
        >
          <div className="flex gap-4">
            <div className="h-11 w-11 rounded-full bg-surface-soft" />

            <div className="flex-1 space-y-3">
              <div className="h-4 w-1/3 rounded bg-surface-soft" />

              <div className="h-3 w-1/4 rounded bg-surface-soft" />
            </div>

            <div className="h-7 w-20 rounded-lg bg-surface-soft" />
          </div>

          <div className="mt-5 h-16 rounded-xl bg-surface-soft" />

          <div className="mt-4 space-y-3">
            <div className="h-3 w-full rounded bg-surface-soft" />

            <div className="h-3 w-3/4 rounded bg-surface-soft" />
          </div>

          <div className="mt-5 border-t border-border-soft pt-4">
            <div className="h-4 w-24 rounded bg-surface-soft" />
          </div>
        </div>
      ))}
    </div>
  );
}