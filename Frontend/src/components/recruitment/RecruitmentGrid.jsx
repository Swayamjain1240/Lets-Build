import {
  RefreshCw,
  SearchX,
} from "lucide-react";

import RecruitmentCard from "./RecruitmentCard.jsx";
import RecruitmentSkeleton from "./RecruitmentSkeleton.jsx";

export default function RecruitmentGrid({
  recruitments = [],
  loading = false,
  error = "",
  onRetry,
}) {
  if (loading) {
    return (
      <RecruitmentSkeleton
        cards={6}
      />
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-10 text-center">
        <h2 className="font-semibold text-heading">
          Unable to load recruitments
        </h2>

        <p className="mt-2 text-sm text-muted">
          {error}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mx-auto mt-5 flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  }

  if (
    recruitments.length === 0
  ) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-10 text-center">
        <SearchX
          size={30}
          className="mx-auto text-muted"
        />

        <h2 className="mt-4 font-semibold text-heading">
          No opportunities found
        </h2>

        <p className="mt-2 text-sm text-muted">
          Try changing your search or
          filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {recruitments.map(
        (recruitment) => (
          <RecruitmentCard
            key={recruitment._id}
            recruitment={
              recruitment
            }
          />
        )
      )}
    </div>
  );
}