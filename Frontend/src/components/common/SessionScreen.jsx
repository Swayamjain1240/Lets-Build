export default function SessionScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div
        role="status"
        aria-label="Loading session"
        className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-brand-400"
      />
    </div>
  );
}