import {
  ArrowUpRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import Avatar from "../user/Avatar.jsx";
import SkillBadge from "../user/SkillBadge.jsx";
import MatchScore from "./MatchScore.jsx";

export default function DeveloperRecommendationCard({
  recommendation,
}) {
  const developer =
    recommendation.developer ||
    recommendation.user ||
    recommendation;

  const score =
    recommendation.score || 0;

  if (!developer?._id) {
    return null;
  }

  const skills =
    developer.skills?.length > 0
      ? developer.skills
      : developer.rawSkills || [];

  return (
    <article className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start gap-4">
        <Avatar
          src={
            developer.profilePicture
          }
          name={
            developer.name ||
            "Developer"
          }
          size="lg"
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-heading">
            {developer.name}
          </h3>

          <p className="mt-1 text-sm text-muted">
            {developer.experience ||
              "Developer"}
          </p>
        </div>

        <MatchScore
          score={score}
        />
      </div>

      {developer.bio && (
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted">
          {developer.bio}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {skills
          .slice(0, 4)
          .map((skill, index) => (
            <SkillBadge
              key={
                skill?._id ||
                skill?.name ||
                skill ||
                index
              }
              skill={skill}
            />
          ))}
      </div>

      <Link
        to={`/developers/${developer._id}`}
        className="mt-5 flex items-center justify-between border-t border-border-soft pt-4 text-sm font-medium text-heading"
      >
        View developer

        <ArrowUpRight
          size={16}
          className="text-muted"
        />
      </Link>
    </article>
  );
}