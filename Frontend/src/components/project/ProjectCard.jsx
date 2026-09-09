import {
    ArrowUpRight,
    CalendarDays,
    Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import ProjectStatusBadge from "./ProjectStatusBadge.jsx";
import ProjectSkillList from "./ProjectSkillList.jsx";

const getId = (value) => {
    if (!value) return "";

    return String(
        typeof value === "object"
            ? value._id || value.id || ""
            : value
    );
};

export default function ProjectCard({
    project,
}) {
    if (!project) return null;

    const {
        _id,
        title,
        status,
        owner,
        requiredSkills = [],
        rawRequiredSkills = [],
        teamMembers = [],
        updatedAt,
    } = project;

    const memberIds = [
        getId(owner),

        ...teamMembers.map((member) =>
            getId(member.user)
        ),
    ].filter(Boolean);

    const teamCount =
        new Set(memberIds).size;

    const updatedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        )
        : null;

    return (
        <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/25">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-xs font-medium text-muted">
                        Private workspace
                    </p>

                    <h2 className="mt-2 line-clamp-2 text-lg font-semibold text-heading">
                        {title || "Untitled project"}
                    </h2>
                </div>

                <ProjectStatusBadge
                    status={status}
                />
            </div>

            <div className="mt-5">
                <p className="mb-3 text-xs font-medium text-muted">
                    Required skills
                </p>

                <ProjectSkillList
                    skills={requiredSkills}
                    rawSkills={rawRequiredSkills}
                />
            </div>

            <div className="mt-auto pt-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                        <Users size={15} />

                        {teamCount}{" "}
                        {teamCount === 1
                            ? "member"
                            : "members"}
                    </span>

                    {updatedDate && (
                        <span className="flex items-center gap-1.5">
                            <CalendarDays size={15} />

                            {updatedDate}
                        </span>
                    )}
                </div>

                <Link
                    to={`/projects/${_id}`}
                    className="mt-5 flex items-center justify-between border-t border-border-soft pt-4 text-sm font-medium text-heading"
                >
                    Open workspace

                    <ArrowUpRight
                        size={17}
                        className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                </Link>
            </div>
        </article>
    );
}