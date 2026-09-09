import {
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";

import Avatar from "./Avatar.jsx";
import SkillBadge from "./SkillBadge.jsx";

export default function DeveloperCard({
  developer,
}) {
  if (!developer) return null;

  const {
    _id,
    name,
    profilePicture,
    bio,
    skills = [],
    rawSkills = [],
    experience,
    college,
  } = developer;

  const displaySkills =
    skills.length > 0
      ? skills
      : rawSkills;

  const visibleSkills =
    displaySkills.slice(0, 4);

  const remainingSkills =
    Math.max(
      displaySkills.length -
        visibleSkills.length,
      0
    );

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/25">
      <div className="flex items-start gap-4">
        <Avatar
          src={profilePicture}
          name={name}
          size="lg"
        />

        <div className="min-w-0 flex-1">
          <h2 className="truncate font-semibold text-heading">
            {name}
          </h2>

          <p className="mt-1 text-sm text-brand-400">
            {experience || "Beginner"}
          </p>
        </div>
      </div>

      <p className="mt-5 line-clamp-3 min-h-18 text-sm leading-6 text-muted">
        {bio ||
          "This developer has not added a bio yet."}
      </p>

      {visibleSkills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {visibleSkills.map(
            (skill, index) => (
              <SkillBadge
                key={
                  skill?._id ||
                  skill?.name ||
                  skill ||
                  index
                }
                skill={skill}
              />
            )
          )}

          {remainingSkills > 0 && (
            <span className="inline-flex items-center rounded-lg border border-border px-2.5 py-1 text-xs text-muted">
              +{remainingSkills}
            </span>
          )}
        </div>
      )}

      <div className="mt-auto pt-6">
        {college?.name && (
          <div className="mb-4 flex items-center gap-2 text-xs text-muted">
            <GraduationCap size={15} />

            <span className="truncate">
              {college.name}
            </span>
          </div>
        )}

        <Link
          to={`/developers/${_id}`}
          className="flex items-center justify-between border-t border-border-soft pt-4 text-sm font-medium text-heading"
        >
          View profile

          <ArrowUpRight
            size={17}
            className="text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
}