import {
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import ProfileHeader from "../../components/profile/ProfileHeader.jsx";
import ProfileAbout from "../../components/profile/ProfileAbout.jsx";
import ProfileSkills from "../../components/profile/ProfileSkills.jsx";
import ProfileEducation from "../../components/profile/ProfileEducation.jsx";
import ProfileDetailSkeleton from "../../components/profile/ProfileDetailSkeleton.jsx";

import DeveloperInviteSection from "../../components/request/DeveloperInviteSection.jsx";

import {
  getDeveloperById,
} from "../../services/userServices.js";

const extractDeveloper = (response) => {
  return (
    response?.data?.user ||
    response?.data?.developer ||
    response?.data ||
    null
  );
};

export default function DeveloperProfile() {
  const { id } = useParams();

  const [developer, setDeveloper] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchDeveloper =
    useCallback(async () => {
      if (!id) {
        setError(
          "Developer ID is missing."
        );

        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response =
          await getDeveloperById(id);

        const developerData =
          extractDeveloper(response);

        if (!developerData?._id) {
          throw new Error(
            "Developer not found."
          );
        }

        setDeveloper(
          developerData
        );
      } catch (err) {
        console.error(
          "Failed to load developer:",
          err
        );

        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load developer profile."
        );

        setDeveloper(null);
      } finally {
        setLoading(false);
      }
    }, [id]);

  useEffect(() => {
    fetchDeveloper();
  }, [fetchDeveloper]);

  if (loading) {
    return (
      <ProfileDetailSkeleton />
    );
  }

  if (error || !developer) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-10 text-center">
        <h2 className="text-lg font-semibold text-heading">
          Developer unavailable
        </h2>

        <p className="mt-2 text-sm text-muted">
          {error ||
            "Developer profile could not be found."}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/developers"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-heading hover:bg-background"
          >
            <ArrowLeft size={16} />

            Back to developers
          </Link>

          <button
            type="button"
            onClick={fetchDeveloper}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            <RefreshCw size={16} />

            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Link
        to="/developers"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-heading"
      >
        <ArrowLeft size={16} />

        Back to developers
      </Link>

      <ProfileHeader
        user={developer}
      />

      <DeveloperInviteSection
        developer={developer}
      />

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <ProfileAbout
            user={developer}
          />

          <ProfileSkills
            user={developer}
          />
        </div>

        <ProfileEducation
          user={developer}
        />
      </div>
    </div>
  );
}