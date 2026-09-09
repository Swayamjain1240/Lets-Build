import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import Button from "../../components/common/Button";
import useAuth from "../../hooks/useAuth";
import { getCurrentUser } from "../../services/authService";
import { gsap, useGSAP } from "../../lib/gsap";

import useOnboardingForm from "../../hooks/useOnboardingForm";
import OnboardingProgress from "./OnboardingProgress";

import AboutYouStep from "./steps/AboutYouStep";
import SkillsStep from "./steps/SkillsStep";
import EducationStep from "./steps/EducationStep";
import ReviewStep from "./steps/ReviewStep";

const steps = [
  {
    title: "About you",
    description: "Your developer identity",
    Component: AboutYouStep,
  },
  {
    title: "Skills",
    description: "What you work with",
    Component: SkillsStep,
  },
  {
    title: "Education",
    description: "Your background",
    Component: EducationStep,
  },
  {
    title: "Review",
    description: "Complete your profile",
    Component: ReviewStep,
  },
];

export default function Onboarding() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const form = useOnboardingForm();

  const contentRef = useRef(null);
  const [saveError, setSaveError] = useState("");

  const CurrentStep = steps[form.step].Component;

  // Focus the first invalid field after its step renders.
  useEffect(() => {
    if (!form.firstErrorField) return;

    const field = document.getElementById(
      form.firstErrorField
    );

    field?.focus();
  }, [form.firstErrorField, form.step]);

  // Restrained step transition.
  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) return;

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        }
      );
    },
    {
      scope: contentRef,
      dependencies: [form.step],
      revertOnUpdate: true,
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaveError("");

    const response = await form.submit();

    // Validation/API failure is already handled by the hook.
    if (!response) return;

    try {
      // /auth/me returns the current user in response.data.
      const currentUserResponse = await getCurrentUser();
      const currentUser = currentUserResponse.data;

      if (!currentUser?.isOnboarded) {
        throw new Error(
          "Profile saved, but onboarding status was not updated."
        );
      }

      setUser(currentUser);
      navigate("/home", { replace: true });
    } catch (error) {
      setSaveError(
        error.response?.data?.message ||
          error.message ||
          "Profile saved, but session refresh failed."
      );
    }
  };

  return (
    <main className="min-h-screen bg-background px-5 py-10 text-body sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 font-bold text-white">
              L
            </div>

            <span className="text-lg font-bold text-heading">
              Let's Build
            </span>
          </div>

          <p className="mb-2 text-sm font-medium text-brand-400">
            Your developer profile
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            Let's get you set up.
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Add the details that help other developers understand
            your skills and collaboration interests.
          </p>
        </header>

        <OnboardingProgress
          steps={steps}
          currentStep={form.step}
        />

        <form onSubmit={handleSubmit} noValidate>
          <div
            ref={contentRef}
            className="rounded-2xl border border-border bg-surface/60 p-5 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-heading">
              {steps[form.step].title}
            </h2>

            <p className="mb-8 mt-2 text-sm text-muted">
              {steps[form.step].description}
            </p>

            <CurrentStep form={form} user={user} />
          </div>

          {(form.formError || saveError) && (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger"
            >
              {form.formError || saveError}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={form.back}
              disabled={form.step === 0 || form.isSubmitting}
            >
              <ArrowLeft size={16} />
              Back
            </Button>

            {form.step < steps.length - 1 ? (
              <Button
                type="button"
                onClick={form.next}
                disabled={form.isSubmitting}
              >
                Continue
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={form.isSubmitting}
              >
                {form.isSubmitting
                  ? "Saving profile..."
                  : "Complete profile"}
                <CheckCircle2 size={16} />
              </Button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}