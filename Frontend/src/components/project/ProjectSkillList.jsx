import SkillBadge from "../user/SkillBadge.jsx";

export default function ProjectSkillList({
    skills = [],
    rawSkills = [],
    limit = 4,
}) {
    const displaySkills =
        skills.length > 0
            ? skills
            : rawSkills;

    if (displaySkills.length === 0) {
        return (
            <p className="text-xs text-muted">
                No required skills added.
            </p>
        );
    }

    const visibleSkills =
        displaySkills.slice(0, limit);

    const remaining =
        displaySkills.length - visibleSkills.length;

    return (
        <div className="flex flex-wrap gap-2">
            {visibleSkills.map((skill, index) => (
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

            {remaining > 0 && (
                <span className="inline-flex items-center rounded-lg border border-border px-2.5 py-1 text-xs text-muted">
                    +{remaining}
                </span>
            )}
        </div>
    );
}