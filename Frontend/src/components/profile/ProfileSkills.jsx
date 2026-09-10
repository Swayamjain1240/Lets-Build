import { Code2 } from "lucide-react";

import SkillBadge from "../user/SkillBadge.jsx";

export default function ProfileSkills({
  skills = [],
  rawSkills = [],
}) {
  const displaySkills =
    skills.length > 0
      ? skills
      : rawSkills;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-2">
        <Code2
          size={19}
          className="text-brand-400"
        />

        <h2 className="font-semibold text-heading">
          Skills
        </h2>
      </div>

      {displaySkills.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {displaySkills.map(
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
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted">
          No skills added yet.
        </p>
      )}
    </section>
  );
}