export default function ProfileDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="h-24 w-24 shrink-0 rounded-full bg-surface-soft" />

          <div className="flex-1 space-y-3 pt-2">
            <div className="h-6 w-52 rounded bg-surface-soft" />

            <div className="h-4 w-32 rounded bg-surface-soft" />

            <div className="h-4 w-64 max-w-full rounded bg-surface-soft" />

            <div className="flex gap-2 pt-2">
              <div className="h-9 w-24 rounded-lg bg-surface-soft" />
              <div className="h-9 w-24 rounded-lg bg-surface-soft" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <SkeletonBox />
          <SkeletonBox />
        </div>

        <SkeletonBox />
      </div>
    </div>
  );
}

function SkeletonBox() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="h-5 w-28 rounded bg-surface-soft" />

      <div className="mt-5 space-y-3">
        <div className="h-3 w-full rounded bg-surface-soft" />
        <div className="h-3 w-5/6 rounded bg-surface-soft" />
        <div className="h-3 w-2/3 rounded bg-surface-soft" />
      </div>
    </div>
  );
}