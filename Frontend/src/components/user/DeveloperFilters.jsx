import {
    Search,
    SlidersHorizontal,
    X,
} from "lucide-react";

export default function DeveloperFilters({
    search,
    skill,
    experience,
    skillOptions = [],
    onSearchChange,
    onSkillChange,
    onExperienceChange,
    onClear,
    hasFilters,
}) {
    return (
        <div className="rounded-2xl border border-border bg-surface p-4">
            <div className="grid gap-3 lg:grid-cols-[1fr_220px_200px_auto]">
                {/* Search */}
                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            onSearchChange(event.target.value)
                        }
                        placeholder="Search developers..."
                        className="
              w-full rounded-xl border border-border
              bg-background py-2.5 pl-10 pr-4
              text-sm text-heading outline-none
              transition-colors
              placeholder:text-muted
              focus:border-brand-500/50
            "
                    />
                </div>

                {/* Skill */}
                <select
                    value={skill}
                    onChange={(event) =>
                        onSkillChange(event.target.value)
                    }
                    className="
            rounded-xl border border-border
            bg-background px-3 py-2.5
            text-sm text-heading outline-none
            focus:border-brand-500/50
          "
                >
                    <option value="">All skills</option>

                    {skillOptions.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Experience */}
                <select
                    value={experience}
                    onChange={(event) =>
                        onExperienceChange(event.target.value)
                    }
                    className="
            rounded-xl border border-border
            bg-background px-3 py-2.5
            text-sm text-heading outline-none
            focus:border-brand-500/50
          "
                >
                    <option value="">All experience</option>
                    <option value="Beginner">
                        Beginner
                    </option>
                    <option value="Intermediate">
                        Intermediate
                    </option>
                    <option value="Advanced">
                        Advanced
                    </option>
                </select>

                {/* Clear */}
                <button
                    type="button"
                    onClick={onClear}
                    disabled={!hasFilters}
                    className="
            inline-flex items-center justify-center
            gap-2 rounded-xl border border-border
            px-4 py-2.5 text-sm text-muted
            transition-colors
            hover:bg-background hover:text-heading
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
                >
                    {hasFilters ? (
                        <X size={17} />
                    ) : (
                        <SlidersHorizontal size={17} />
                    )}

                    Clear
                </button>
            </div>
        </div>
    );
}