export default function SkillBadge({
  skill,
  className = "",
}) {
  const skillName =
    typeof skill === "string"
      ? skill
      : skill?.displayName ||
        skill?.name ||
        "Skill";

  return (
    <span
      className={`
        inline-flex items-center
        rounded-lg
        border border-brand-500/15
        bg-brand-500/5
        px-2.5 py-1
        text-xs font-medium
        text-brand-300
        ${className}
      `}
    >
      {skillName}
    </span>
  );
}