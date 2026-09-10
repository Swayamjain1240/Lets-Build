import {
    FolderKanban,
    SearchX,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectEmptyState({
    filtered = false,
    onClear,
}) {
    const Icon = filtered
        ? SearchX
        : FolderKanban;

    return (
        <div className="rounded-2xl border border-border bg-surface p-10 text-center">
            <Icon
                size={32}
                className="mx-auto text-muted"
            />

            <h2 className="mt-4 font-semibold text-heading">
                {filtered
                    ? "No matching projects"
                    : "No projects yet"}
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">
                {filtered
                    ? "Try changing your filters to see more projects."
                    : "Create your first private workspace and start building your idea."}
            </p>

            {filtered ? (
                <button
                    type="button"
                    onClick={onClear}
                    className="mt-5 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-heading hover:bg-background"
                >
                    Clear filters
                </button>
            ) : (
                <Link
                    to="/projects/new"
                    className="mt-5 inline-flex rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
                >
                    Create project
                </Link>
            )}
        </div>
    );
}