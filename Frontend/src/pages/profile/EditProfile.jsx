import {
  ArrowLeft,
  Save,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import ProfileDetailSkeleton from "../../components/profile/ProfileDetailSkeleton.jsx";
import ProfileFormFields from "../../components/profile/ProfileFormFields.jsx";

import useProfileForm from "../../hooks/useProfileForm.js";
import useAuth from "../../hooks/useAuth.js";

import {
  getCurrentUser,
} from "../../services/authService.js";

import {
  gsap,
  useGSAP,
} from "../../lib/gsap.js";

export default function EditProfile() {
  const navigate = useNavigate();

  const {
    user,
    setUser,
  } = useAuth();

  const form =
    useProfileForm();

  useGSAP(() => {
    gsap.from(
      ".edit-profile-page",
      {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: "power3.out",
      }
    );
  }, []);

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const response =
      await form.submit();

    if (!response) return;

    try {
      const currentUserResponse =
        await getCurrentUser();

      if (
        currentUserResponse?.data
      ) {
        setUser(
          currentUserResponse.data
        );
      }

      navigate(
        "/profile",
        {
          replace: true,
        }
      );
    } catch (error) {
      console.error(
        "Profile saved but user refresh failed:",
        error
      );

      navigate(
        "/profile",
        {
          replace: true,
        }
      );
    }
  };

  if (form.loading) {
    return (
      <ProfileDetailSkeleton />
    );
  }

  if (
    form.error &&
    !form.formData
  ) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-10 text-center">
        <h2 className="font-semibold text-heading">
          Unable to edit profile
        </h2>

        <p className="mt-2 text-sm text-muted">
          {form.error}
        </p>

        <Link
          to="/profile"
          className="mt-5 inline-flex text-sm font-medium text-brand-400"
        >
          Back to profile
        </Link>
      </div>
    );
  }

  return (
    <div className="edit-profile-page mx-auto max-w-3xl">
      <Link
        to="/profile"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-heading"
      >
        <ArrowLeft size={16} />
        Back to profile
      </Link>

      <header className="mt-5">
        <p className="text-sm font-medium text-brand-400">
          Profile settings
        </p>

        <h1 className="mt-2 text-3xl font-bold text-heading">
          Edit your profile
        </h1>

        <p className="mt-2 text-sm text-muted">
          Keep your developer
          information accurate so other
          users can discover you.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-7 rounded-2xl border border-border bg-surface p-6"
      >
        <ProfileFormFields
          form={form}
          userName={
            user?.name ||
            "Developer"
          }
        />

        {form.error && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
            {form.error}
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border-soft pt-6 sm:flex-row sm:justify-end">
          <Link
            to="/profile"
            className="rounded-xl border border-border px-5 py-2.5 text-center text-sm font-medium text-heading hover:bg-background"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={form.saving}
            className="
              inline-flex items-center
              justify-center gap-2
              rounded-xl bg-brand-500
              px-5 py-2.5
              text-sm font-medium
              text-white
              transition-opacity
              hover:opacity-90
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Save size={17} />

            {form.saving
              ? "Saving..."
              : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}