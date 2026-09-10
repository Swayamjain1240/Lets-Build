import {
  CheckCircle2,
  UserPlus,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import useAuth from "../../hooks/useAuth.js";
import useProjects from "../../hooks/useProjects.js";

import InviteDeveloperModal from "./InviteDeveloperModal.jsx";

const getId = (value) =>
  String(
    typeof value === "object"
      ? value?._id || ""
      : value || ""
  );

export default function DeveloperInviteSection({
  developer,
}) {
  const { user } =
    useAuth();

  const {
    projects,
    loading,
  } = useProjects();

  const [showModal, setShowModal] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const isSelf =
    getId(user?._id) ===
    getId(developer?._id);

  const ownedProjects =
    useMemo(
      () =>
        projects.filter(
          (project) =>
            getId(project.owner) ===
            getId(user?._id)
        ),
      [projects, user?._id]
    );

  if (
    isSelf ||
    loading ||
    ownedProjects.length === 0
  ) {
    return null;
  }

  const handleSuccess = () => {
    setSuccess(true);
    setShowModal(false);
  };

  return (
    <>
      <section className="rounded-2xl border border-border bg-surface p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-heading">
              Build together
            </h2>

            <p className="mt-1 text-sm text-muted">
              Invite this developer to
              one of your projects.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setShowModal(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white"
          >
            <UserPlus size={17} />
            Invite to Project
          </button>
        </div>

        {success && (
          <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400">
            <CheckCircle2 size={16} />
            Invitation sent successfully.
          </div>
        )}
      </section>

      {showModal && (
        <InviteDeveloperModal
          developer={developer}
          projects={ownedProjects}
          onClose={() =>
            setShowModal(false)
          }
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}