import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  RefreshCw,
} from "lucide-react";

import ProfileHeader from "../../components/user/ProfileHeader.jsx";
import ProfileAbout from "../../components/user/ProfileAbout.jsx";
import ProfileSkills from "../../components/user/ProfileSkills.jsx";
import ProfileEducation from "../../components/user/ProfileEducation.jsx";
import ProfileDetailSkeleton from "../../components/user/ProfileDetailSkeleton.jsx";

import {
  getMyProfile,
} from "../../services/userServices.js";

import {
  gsap,
  useGSAP,
} from "../../lib/gsap.js";

export default function MyProfile() {
  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchProfile =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await getMyProfile();

        setProfile(
          response?.data || null
        );
      } catch (err) {
        console.error(
          "Failed to load profile:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useGSAP(() => {
    gsap.from(".profile-page", {
      opacity: 0,
      y: 12,
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  if (loading) {
    return <ProfileDetailSkeleton />;
  }

  if (error || !profile) {
    return (
      <ProfileError
        message={
          error ||
          "Profile was not found."
        }
        onRetry={fetchProfile}
      />
    );
  }

  return (
    <div className="profile-page space-y-5">
      <ProfileHeader
        profile={profile}
        isOwnProfile
      />

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <ProfileAbout
            bio={profile.bio}
          />

          <ProfileSkills
            skills={profile.skills}
            rawSkills={
              profile.rawSkills
            }
          />
        </div>

        <ProfileEducation
          college={profile.college}
        />
      </div>
    </div>
  );
}

function ProfileError({
  message,
  onRetry,
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-10 text-center">
      <h2 className="font-semibold text-heading">
        Unable to load profile
      </h2>

      <p className="mt-2 text-sm text-muted">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
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