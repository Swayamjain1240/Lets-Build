import {
  Search,
  X,
} from "lucide-react";

export default function RecruitmentFilters({
  search,
  skill,
  status,
  skillOptions = [],
  onSearchChange,
  onSkillChange,
  onStatusChange,
  onClear,
  hasFilters,
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="grid gap-3 lg:grid-cols-[1fr_220px_180px_auto]">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            value={search}
            onChange={(event) =>
              onSearchChange(
                event.target.value
              )
            }
            placeholder="Search opportunities..."
            className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-heading outline-none placeholder:text-muted focus:border-brand-500/50"
          />
        </div>

        <select
          value={skill}
          onChange={(event) =>
            onSkillChange(
              event.target.value
            )
          }
          className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-heading outline-none"
        >
          <option value="">
            All skills
          </option>

          {skillOptions.map(
            (option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            )
          )}
        </select>

        <select
          value={status}
          onChange={(event) =>
            onStatusChange(
              event.target.value
            )
          }
          className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-heading outline-none"
        >
          <option value="">
            All statuses
          </option>

          <option value="open">
            Open
          </option>

          <option value="closed">
            Closed
          </option>
        </select>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasFilters}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm text-muted hover:bg-background hover:text-heading disabled:opacity-40"
        >
          <X size={16} />
          Clear
        </button>
      </div>
    </div>
  );
}