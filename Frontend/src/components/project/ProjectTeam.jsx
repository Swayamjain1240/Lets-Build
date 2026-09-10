import {
  UserPlus,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import TeamMemberCard from "./TeamMemberCard.jsx";

const getId = (value) => {
  if (!value) return "";

  const actualValue =
    value.user || value;

  return String(
    actualValue?._id ||
      actualValue?.id ||
      actualValue ||
      ""
  );
};

export default function ProjectTeam({
  project,
  isOwner = false,
  removingMemberId = "",
  onRemoveMember,
}) {
  const owner =
    typeof project.owner === "object"
      ? project.owner
      : {
          _id: project.owner,
          name: "Project Owner",
        };

  const ownerId =
    getId(owner);

  const teamMembers = (
    project.teamMembers || []
  ).filter(
    (member) =>
      getId(member) !== ownerId
  );

  const totalMembers =
    1 + teamMembers.length;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Users
              size={19}
              className="text-brand-400"
            />

            <h2 className="font-semibold text-heading">
              Project Team
            </h2>
          </div>

          <p className="mt-2 text-sm text-muted">
            {totalMembers}{" "}
            {totalMembers === 1
              ? "member"
              : "members"}
          </p>
        </div>

        {isOwner && (
          <Link
            to="/developers"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-heading hover:bg-background"
          >
            <UserPlus size={16} />
            Find developers
          </Link>
        )}
      </div>

      <div className="mt-6 space-y-3">
        <TeamMemberCard
          member={owner}
          isOwner
        />

        {teamMembers.map(
          (member) => {
            const memberId =
              getId(member);

            return (
              <TeamMemberCard
                key={
                  memberId ||
                  member._id
                }
                member={member}
                canRemove={isOwner}
                removing={
                  removingMemberId ===
                  memberId
                }
                onRemove={
                  onRemoveMember
                }
              />
            );
          }
        )}

        {teamMembers.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-6 text-center">
            <Users
              size={25}
              className="mx-auto text-muted"
            />

            <p className="mt-3 text-sm text-muted">
              No additional team members yet.
            </p>

            <p className="mt-1 text-xs leading-5 text-muted">
              Use recruitment or invitations
              to bring developers into this
              project.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}