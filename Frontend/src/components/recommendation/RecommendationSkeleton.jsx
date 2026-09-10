export default function RecommendationSkeleton({
  cards = 3,
}) {
  const count = Math.min(
    Math.max(cards, 1),
    6
  );

  return (
    <div
      role="status"
      aria-label="Finding recommendations"
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
    >
      {Array.from({
        length: count,
      }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-border bg-surface p-5 motion-reduce:animate-none"
        >
          <div className="flex gap-4">
            <div className="h-14 w-14 rounded-full bg-surface-soft" />

            <div className="flex-1 space-y-3">
              <div className="h-4 w-2/3 rounded bg-surface-soft" />

              <div className="h-3 w-1/3 rounded bg-surface-soft" />
            </div>

            <div className="h-8 w-12 rounded bg-surface-soft" />
          </div>

          <div className="mt-6 space-y-3">
            <div className="h-3 w-full rounded bg-surface-soft" />

            <div className="h-3 w-4/5 rounded bg-surface-soft" />
          </div>

          <div className="mt-5 flex gap-2">
            <div className="h-7 w-16 rounded-lg bg-surface-soft" />

            <div className="h-7 w-20 rounded-lg bg-surface-soft" />
          </div>

          <div className="mt-6 border-t border-border-soft pt-4">
            <div className="h-4 w-1/2 rounded bg-surface-soft" />
          </div>
        </div>
      ))}
    </div>
  );
}