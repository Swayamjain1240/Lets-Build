export default function ProfileSkeleton({
  cards = 6,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({
        length: cards,
      }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-border bg-surface p-5"
        >
          <div className="flex gap-4">
            <div className="h-16 w-16 shrink-0 rounded-full bg-surface-soft" />

            <div className="flex-1 space-y-3 pt-1">
              <div className="h-4 w-2/3 rounded bg-surface-soft" />

              <div className="h-3 w-1/3 rounded bg-surface-soft" />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="h-3 w-full rounded bg-surface-soft" />

            <div className="h-3 w-full rounded bg-surface-soft" />

            <div className="h-3 w-3/4 rounded bg-surface-soft" />
          </div>

          <div className="mt-6 flex gap-2">
            <div className="h-7 w-16 rounded-lg bg-surface-soft" />

            <div className="h-7 w-20 rounded-lg bg-surface-soft" />

            <div className="h-7 w-14 rounded-lg bg-surface-soft" />
          </div>

          <div className="mt-7 border-t border-border-soft pt-4">
            <div className="h-3 w-1/2 rounded bg-surface-soft" />
          </div>
        </div>
      ))}
    </div>
  );
}