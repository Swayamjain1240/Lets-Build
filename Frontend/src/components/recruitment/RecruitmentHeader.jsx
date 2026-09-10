import {
  ArrowLeft,
  Lock,
  Pencil,
  Trash2,
  Unlock,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import RecruitmentStatusBadge from "./RecruitmentStatusBadge.jsx";

export default function RecruitmentHeader({
  recruitment,
  isOwner = false,
  managing = false,
  deleting = false,
  onToggleStatus,
  onDelete,
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <Link
        to="/recruitments"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-heading"
      >
        <ArrowLeft size={16} />
        Back to recruitments
      </Link>

      <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-brand-400">
            Collaboration opportunity
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading">
            {recruitment.title}
          </h1>

          <div className="mt-4">
            <RecruitmentStatusBadge
              isOpen={
                recruitment.isOpen
              }
            />
          </div>
        </div>

        {isOwner && (
          <div className="flex flex-wrap gap-2">
            <Link
              to={`/recruitments/${recruitment._id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-heading hover:bg-background"
            >
              <Pencil size={16} />
              Edit
            </Link>

            <button
              type="button"
              onClick={onToggleStatus}
              disabled={managing}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-heading hover:bg-background disabled:opacity-50"
            >
              {recruitment.isOpen ? (
                <Lock size={16} />
              ) : (
                <Unlock size={16} />
              )}

              {managing
                ? "Updating..."
                : recruitment.isOpen
                  ? "Close"
                  : "Reopen"}
            </button>

            <button
              type="button"
              onClick={onDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/5 disabled:opacity-50"
            >
              <Trash2 size={16} />

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