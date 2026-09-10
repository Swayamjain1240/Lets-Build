import {
  Crown,
  Users,
} from "lucide-react";

import Avatar from "../user/Avatar.jsx";

const getId = (value) =>
  String(
    typeof value === "object"
      ? value?._id || ""
      : value || ""
  );

export default function ProjectTeamPreview({
  project,
}) {
  const owner = project.owner;

  const members =
    project.teamMembers || [];

  const ownerId = getId(owner);

  const teamMembers = members.filter(
    (member) =>
      getId(member.user) !== ownerId
  );

  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-2">
        <Users
          size={19}
          className="text-brand-400"
        />

        <h2 className="font-semibold text-heading">
          Team
        </h2>
      </div>

      <div className="mt-5 space-y-4">
        {owner && (
          <Member
            user={
              typeof owner === "object"
                ? owner
                : null
            }
            fallback="Project Owner"
            role="Owner"
            owner
          />
        )}

        {teamMembers
          .slice(0, 5)
          .map((member) => (
            <Member
              key={
                getId(member.user) ||
                member._id
              }
              user={
                typeof member.user ===
                "object"
                  ? member.user
                  : null
              }
              fallback="Team member"
              role={
                member.role ||
                "Member"
              }
            />
          ))}

        {teamMembers.length === 0 && (
          <p className="text-sm text-muted">
            No additional team members yet.
          </p>
        )}

        {teamMembers.length > 5 && (
          <p className="text-xs text-muted">
            +{teamMembers.length - 5} more
            members
          </p>
        )}
      </div>
    </section>
  );
}

function Member({
  user,
  fallback,
  role,
  owner = false,
}) {
  const name =
    user?.name || fallback;

  return (
    <div className="flex items-center gap-3">
      <Avatar
        src={user?.profilePicture}
        name={name}
        size="sm"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-heading">
          {name}
        </p>

        <p className="text-xs text-muted">
          {role}
        </p>
      </div>

      {owner && (
        <Crown
          size={16}
          className="text-brand-400"
        />
      )}
    </div>
  );
}