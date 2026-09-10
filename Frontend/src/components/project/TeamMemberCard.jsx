import {
  Crown,
  ExternalLink,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";

import Avatar from "../user/Avatar.jsx";

export default function TeamMemberCard({
  member,
  isOwner = false,
  canRemove = false,
  removing = false,
  onRemove,
}) {
  if (!member) return null;

  const user =
    member.user || member;

  const role = isOwner
    ? "Project Owner"
    : member.role || "Member";

  const userId =
    user?._id || user?.id;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border-soft bg-background/40 p-4 sm:flex-row sm:items-center">
      <Avatar
        src={user?.profilePicture}
        name={user?.name || "Developer"}
        size="md"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-semibold text-heading">
            {user?.name || "Developer"}
          </p>

          {isOwner && (
            <Crown
              size={15}
              className="text-brand-400"
            />
          )}
        </div>

        <p className="mt-1 text-xs text-muted">
          {role}
        </p>

        {user?.experience && (
          <p className="mt-1 text-xs text-muted">
            {user.experience}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {userId && (
          <Link
            to={`/developers/${userId}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-heading hover:bg-surface"
          >
            Profile
            <ExternalLink size={13} />
          </Link>
        )}

        {canRemove && !isOwner && (
          <button
            type="button"
            onClick={() => onRemove?.(user)}
            disabled={removing}
            className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={14} />

            {removing
              ? "Removing..."
              : "Remove"}
          </button>
        )}
      </div>
    </div>
  );
}