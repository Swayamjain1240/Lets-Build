export default function ProjectSkeleton({
  cards = 6,
}) {
  const count = Math.min(
    Math.max(cards, 0),
    12
  );

  return (
    <div
      role="status"
      aria-label="Loading projects"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {Array.from({ length: count }).map(
        (_, index) => (
          <div
            key={index}
            aria-hidden="true"
            className="animate-pulse rounded-2xl border border-border bg-surface p-5 motion-reduce:animate-none"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-3">
                <div className="h-3 w-24 rounded bg-surface-soft" />

                <div className="h-5 w-3/4 rounded bg-surface-soft" />
              </div>

              <div className="h-7 w-20 rounded-lg bg-surface-soft" />
            </div>

            <div className="mt-7">
              <div className="h-3 w-28 rounded bg-surface-soft" />

              <div className="mt-3 flex gap-2">
                <div className="h-7 w-16 rounded-lg bg-surface-soft" />
                <div className="h-7 w-20 rounded-lg bg-surface-soft" />
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <div className="h-3 w-24 rounded bg-surface-soft" />
              <div className="h-3 w-28 rounded bg-surface-soft" />
            </div>

            <div className="mt-5 border-t border-border-soft pt-4">
              <div className="h-4 w-1/2 rounded bg-surface-soft" />
            </div>
          </div>
        )
      )}
    </div>
  );
}