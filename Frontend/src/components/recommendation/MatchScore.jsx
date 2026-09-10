const getLabel = (score) => {
  if (score >= 90) {
    return "Excellent match";
  }

  if (score >= 75) {
    return "Strong match";
  }

  if (score >= 60) {
    return "Relevant match";
  }

  return "Possible match";
};

export default function MatchScore({
  score = 0,
}) {
  const safeScore = Math.min(
    Math.max(
      Number(score) || 0,
      0
    ),
    100
  );

  return (
    <div className="min-w-24 text-right">
      <p className="text-lg font-bold text-brand-400">
        {Math.round(safeScore)}
      </p>

      <p className="text-[11px] text-muted">
        {getLabel(safeScore)}
      </p>
    </div>
  );
}