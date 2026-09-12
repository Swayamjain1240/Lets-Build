import {
  RefreshCw,
  SearchX,
  Users,
} from "lucide-react";

import DeveloperCard from "./DeveloperCard.jsx";
import ProfileSkeleton from "../profile/ProfileSkeleton.jsx";

export default function DeveloperGrid({
  developers = [],
  loading = false,
  error = "",
  onRetry,
}) {
  if (loading) {
    return <ProfileSkeleton cards={6} />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-10 text-center">
        <RefreshCw
          size={28}
          className="mx-auto text-muted"
        />

        <h3 className="mt-4 font-semibold text-heading">
          Unable to load developers
        </h3>

        <p className="mt-2 text-sm text-muted">
          {error}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="
              mt-5 rounded-xl bg-brand-500
              px-4 py-2 text-sm font-medium
              text-white transition-opacity
              hover:opacity-90
            "
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  if (developers.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-10 text-center">
        <SearchX
          size={30}
          className="mx-auto text-muted"
        />

        <h3 className="mt-4 font-semibold text-heading">
          No developers found
        </h3>

        <p className="mt-2 text-sm text-muted">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="developer-grid grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {developers.map((developer) => (
        <DeveloperCard
          key={developer._id}
          developer={developer}
        />
      ))}
    </div>
  );
}