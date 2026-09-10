import SkillBadge from "../user/SkillBadge.jsx";

export default function RecruitmentSkillList({
  skills = [],
  limit = 4,
}) {
  if (!skills?.length) {
    return (
      <p className="text-xs text-muted">
        No specific skills listed.
      </p>
    );
  }

  const visibleSkills =
    skills.slice(0, limit);

  const remaining =
    skills.length - visibleSkills.length;

  return (
    <div className="flex flex-wrap gap-2">
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

      {remaining > 0 && (
        <span className="inline-flex items-center rounded-lg border border-border px-2.5 py-1 text-xs text-muted">
          +{remaining}
        </span>
      )}
    </div>
  );
}