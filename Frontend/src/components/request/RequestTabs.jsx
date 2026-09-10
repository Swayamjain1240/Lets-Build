import {
  Inbox,
  Send,
} from "lucide-react";

const tabs = [
  {
    value: "received",
    label: "Received",
    Icon: Inbox,
  },
  {
    value: "sent",
    label: "Sent",
    Icon: Send,
  },
];

export default function RequestTabs({
  activeTab,
  onChange,
  receivedCount = 0,
  sentCount = 0,
}) {
  return (
    <div className="inline-flex rounded-xl border border-border bg-surface p-1">
      {tabs.map(
        ({
          value,
          label,
          Icon,
        }) => {
          const active =
            activeTab === value;

          const count =
            value === "received"
              ? receivedCount
              : sentCount;

          return (
            <button
              key={value}
              type="button"
              onClick={() =>
                onChange(value)
              }
              className={`
                inline-flex items-center
                gap-2 rounded-lg
                px-4 py-2
                text-sm font-medium
                transition-colors
                ${
                  active
                    ? "bg-background text-heading"
                    : "text-muted hover:text-heading"
                }
              `}
            >
              <Icon size={16} />

              {label}

              <span
                className={`
                  rounded-md
                  px-1.5 py-0.5
                  text-[11px]
                  ${
                    active
                      ? "bg-brand-500/10 text-brand-400"
                      : "bg-surface-soft text-muted"
                  }
                `}
              >
                {count}
              </span>
            </button>
          );
        }
      )}
    </div>
  );
}