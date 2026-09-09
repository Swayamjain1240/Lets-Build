export default function Avatar({
  src,
  name = "User",
  size = "md",
  className = "",
}) {
  const sizes = {
    sm: "h-9 w-9 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-2xl",
  };

  const initials = name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`
        flex shrink-0 items-center justify-center
        overflow-hidden rounded-full
        bg-brand-500/10
        font-semibold text-brand-400
        ${sizes[size] || sizes.md}
        ${className}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={`${name} profile`}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{initials || "U"}</span>
      )}
    </div>
  );
}