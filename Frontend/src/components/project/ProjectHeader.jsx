import {
    ArrowLeft,
    Pencil,
    Trash2,
    UserRound,
} from "lucide-react";

import { Link } from "react-router-dom";

import ProjectStatusBadge from "./ProjectStatusBadge.jsx";

export default function ProjectHeader({
    project,
    isOwner = false,
    deleting = false,
    onDelete,
}) {
    const ownerName =
        typeof project?.owner ===
        "object"
            ? project.owner?.name
            : "";

    return (
        <section className="rounded-2xl border border-border bg-surface p-6">
            <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-heading"
            >
                <ArrowLeft size={16} />
                Back to projects
            </Link>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <p className="text-sm font-medium text-brand-400">
                        {isOwner
                            ? "Private project workspace"
                            : "Collaboration workspace"}
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading">
                        {project.title}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <ProjectStatusBadge
                            status={
                                project.status
                            }
                        />

                        {!isOwner && (
                            <span className="rounded-full border border-brand-500/20 bg-brand-500/5 px-3 py-1 text-xs font-medium text-brand-400">
                                Collaborator
                            </span>
                        )}
                    </div>

                    {!isOwner &&
                        ownerName && (
                            <div className="mt-4 flex items-center gap-2 text-sm text-muted">
                                <UserRound
                                    size={16}
                                />

                                Project owner:

                                <span className="font-medium text-heading">
                                    {
                                        ownerName
                                    }
                                </span>
                            </div>
                        )}
                </div>

                {isOwner && (
                    <div className="flex shrink-0 gap-2">
                        <Link
                            to={`/projects/${project._id}/edit`}
                            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-heading hover:bg-background"
                        >
                            <Pencil
                                size={
                                    16
                                }
                            />
                            Edit
                        </Link>

                        <button
                            type="button"
                            onClick={
                                onDelete
                            }
                            disabled={
                                deleting
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/5 disabled:opacity-50"
                        >
                            <Trash2
                                size={
                                    16
                                }
                            />

                            {deleting
                                ? "Deleting..."
                                : "Delete"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}