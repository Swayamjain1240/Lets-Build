import {
  ArrowUpRight,
  FolderKanban,
} from "lucide-react";

import { Link } from "react-router-dom";

import RecruitmentStatusBadge from "./RecruitmentStatusBadge.jsx";
import RecruitmentSkillList from "./RecruitmentSkillList.jsx";

export default function RecruitmentCard({
  recruitment,
}) {
  if (!recruitment) return null;

  const {
    _id,
    title,
    publicSummary,
    requiredSkills = [],
    isOpen,
    project,
  } = recruitment;

  const projectName =
    typeof project === "object"
      ? project?.title
      : "";

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/25">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-brand-400">
            Collaboration opportunity
          </p>

          <h2 className="mt-2 line-clamp-2 text-lg font-semibold text-heading">
            {title ||
              "Untitled recruitment"}
          </h2>
        </div>

        <RecruitmentStatusBadge
          isOpen={isOpen}
        />
      </div>

      {projectName && (
        <div className="mt-4 flex items-center gap-2 text-xs text-muted">
          <FolderKanban size={15} />

          <span className="truncate">
            {projectName}
          </span>
        </div>
      )}

      <p className="mt-5 line-clamp-3 min-h-[72px] text-sm leading-6 text-muted">
        {publicSummary ||
          "No public summary available."}
      </p>

      <div className="mt-5">
        <p className="mb-3 text-xs font-medium text-muted">
          Required skills
        </p>

        <RecruitmentSkillList
          skills={requiredSkills}
        />
      </div>

      <div className="mt-auto pt-6">
        <Link
          to={`/recruitments/${_id}`}
          className="flex items-center justify-between border-t border-border-soft pt-4 text-sm font-medium text-heading"
        >
          View opportunity

          <ArrowUpRight
            size={17}
            className="text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
}