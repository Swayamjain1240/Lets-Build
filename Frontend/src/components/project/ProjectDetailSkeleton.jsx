export default function ProjectDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="h-4 w-32 rounded bg-surface-soft" />

        <div className="mt-6 h-8 w-2/3 rounded bg-surface-soft" />

        <div className="mt-4 h-7 w-24 rounded bg-surface-soft" />
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
      <div className="h-5 w-32 rounded bg-surface-soft" />

      <div className="mt-5 space-y-3">
        <div className="h-3 w-full rounded bg-surface-soft" />
        <div className="h-3 w-5/6 rounded bg-surface-soft" />
        <div className="h-3 w-2/3 rounded bg-surface-soft" />
      </div>
    </div>
  );
}