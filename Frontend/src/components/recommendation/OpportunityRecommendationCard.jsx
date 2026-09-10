import {
  ArrowUpRight,
  FolderKanban,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import RecruitmentSkillList from "../recruitment/RecruitmentSkillList.jsx";
import RecruitmentStatusBadge from "../recruitment/RecruitmentStatusBadge.jsx";
import MatchScore from "./MatchScore.jsx";

export default function OpportunityRecommendationCard({
  recommendation,
}) {
  const opportunity =
    recommendation.recruitment ||
    recommendation.opportunity ||
    recommendation;

  const score =
    recommendation.score || 0;

  if (!opportunity?._id) {
    return null;
  }

  const project =
    typeof opportunity.project ===
    "object"
      ? opportunity.project
      : null;

  return (
    <article className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 font-semibold text-heading">
            {opportunity.title ||
              "Collaboration opportunity"}
          </h3>

          {project?.title && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
              <FolderKanban
                size={14}
              />

              <span className="truncate">
                {project.title}
              </span>
            </p>
          )}
        </div>

        <MatchScore
          score={score}
        />
      </div>

      <div className="mt-4">
        <RecruitmentStatusBadge
          isOpen={
            opportunity.isOpen
          }
        />
      </div>

      {opportunity.publicSummary && (
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted">
          {
            opportunity.publicSummary
          }
        </p>
      )}

      <div className="mt-5">
        <RecruitmentSkillList
          skills={
            opportunity.requiredSkills
          }
        />
      </div>

      <Link
        to={`/recruitments/${opportunity._id}`}
        className="mt-5 flex items-center justify-between border-t border-border-soft pt-4 text-sm font-medium text-heading"
      >
        View opportunity

        <ArrowUpRight
          size={16}
          className="text-muted"
        />
      </Link>
    </article>
  );
}