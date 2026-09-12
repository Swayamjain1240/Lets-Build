import {
    ArrowUpRight,
    CalendarDays,
    Crown,
    UserRound,
} from "lucide-react";

import { Link } from "react-router-dom";

import ProjectStatusBadge from "./ProjectStatusBadge.jsx";
import ProjectSkillList from "./ProjectSkillList.jsx";

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
        updatedAt,
        accessRole,
    } = project;

    const isOwner =
        accessRole === "OWNER";

    const ownerName =
        typeof owner === "object"
            ? owner?.name
            : "Project Owner";

    const updatedDate = updatedAt
        ? new Date(
              updatedAt
          ).toLocaleDateString(
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
                        {isOwner
                            ? "Private project workspace"
                            : "Collaboration workspace"}
                    </p>

                    <h2 className="mt-2 line-clamp-2 text-lg font-semibold text-heading">
                        {title ||
                            "Untitled project"}
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
                    skills={
                        requiredSkills
                    }
                    rawSkills={
                        rawRequiredSkills
                    }
                />
            </div>

            <div className="mt-5 rounded-xl border border-border-soft bg-background/40 p-3">
                {isOwner ? (
                    <div className="flex items-center gap-2 text-xs text-muted">
                        <Crown
                            size={15}
                            className="text-brand-400"
                        />

                        <span>
                            Your project
                        </span>

                        <span className="font-medium text-heading">
                            Owner
                        </span>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted">
                            <UserRound
                                size={15}
                            />

                            <span>
                                Owner:
                            </span>

                            <span className="font-medium text-heading">
                                {ownerName ||
                                    "Project Owner"}
                            </span>
                        </div>

                        <p className="text-xs text-muted">
                            Your role:{" "}
                            <span className="font-medium text-brand-400">
                                Collaborator
                            </span>
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-auto pt-5">
                {updatedDate && (
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                        <CalendarDays
                            size={15}
                        />

                        {updatedDate}
                    </div>
                )}

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