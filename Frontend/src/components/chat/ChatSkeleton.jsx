export default function ChatSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading messages"
      className="space-y-5 p-5"
    >
      <SkeletonMessage
        side="left"
        width="w-2/3"
      />

      <SkeletonMessage
        side="right"
        width="w-1/2"
      />

      <SkeletonMessage
        side="left"
        width="w-3/5"
      />

      <SkeletonMessage
        side="right"
        width="w-2/3"
      />

      <SkeletonMessage
        side="left"
        width="w-1/2"
      />
    </div>
  );
}

function SkeletonMessage({
  side,
  width,
}) {
  return (
    <div
      className={`flex animate-pulse motion-reduce:animate-none ${
        side === "right"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`${width} max-w-md rounded-2xl bg-surface-soft p-4`}
      >
        <div className="h-3 w-full rounded bg-border" />

        <div className="mt-2 h-3 w-3/4 rounded bg-border" />

        <div className="ml-auto mt-3 h-2 w-10 rounded bg-border" />
      </div>
    </div>
  );
}