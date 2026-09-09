const statusStyles = {
    IDEATION: {
        label: "Ideation",
        className:
            "border-violet-500/20 bg-violet-500/10 text-violet-300",
    },

    IN_PROGRESS: {
        label: "In progress",
        className:
            "border-blue-500/20 bg-blue-500/10 text-blue-300",
    },

    COMPLETED: {
        label: "Completed",
        className:
            "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    },
};

export default function ProjectStatusBadge({
    status,
}) {
    const current =
        statusStyles[status] || {
            label: status || "Unknown",
            className:
                "border-border bg-surface-soft text-muted",
        };

    return (
        <span
            className={`
        inline-flex items-center
        rounded-lg border
        px-2.5 py-1
        text-xs font-medium
        ${current.className}
      `}
        >
            {current.label}
        </span>
    );
}