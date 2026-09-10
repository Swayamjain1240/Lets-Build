import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import ProfileHeader from "../../components/user/ProfileHeader.jsx";
import ProfileAbout from "../../components/user/ProfileAbout.jsx";
import ProfileSkills from "../../components/user/ProfileSkills.jsx";
import ProfileEducation from "../../components/user/ProfileEducation.jsx";
import ProfileDetailSkeleton from "../../components/user/ProfileDetailSkeleton.jsx";

import {
  getDeveloperById,
} from "../../services/userServices.js";

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
      if (!id) return;

      setLoading(true);
      setError("");

      try {
        const response =
          await getDeveloperById(id);

        setDeveloper(
          response?.data || null
        );
      } catch (err) {
        console.error(
          "Failed to load developer:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load developer profile."
        );
      } finally {
        setLoading(false);
      }
    }, [id]);

  useEffect(() => {
    fetchDeveloper();
  }, [fetchDeveloper]);

  if (loading) {
    return <ProfileDetailSkeleton />;
  }

  if (error || !developer) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-10 text-center">
        <h2 className="font-semibold text-heading">
          Developer unavailable
        </h2>

        <p className="mt-2 text-sm text-muted">
          {error ||
            "Developer profile was not found."}
        </p>

        <button
          type="button"
          onClick={fetchDeveloper}
          className="
            mx-auto mt-5 flex items-center gap-2
            rounded-xl bg-brand-500
            px-4 py-2 text-sm font-medium
            text-white
          "
        >
          <RefreshCw size={16} />
          Try again
        </button>
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
        profile={developer}
      />

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <ProfileAbout
            bio={developer.bio}
          />

          <ProfileSkills
            skills={developer.skills}
            rawSkills={
              developer.rawSkills
            }
          />
        </div>

        <ProfileEducation
          college={developer.college}
        />
      </div>
    </div>
  );
}