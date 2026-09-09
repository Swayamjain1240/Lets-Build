import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Button from "../../components/common/Button";
import useAuth from "../../hooks/useAuth";
import { gsap, useGSAP } from "../../lib/gsap";

import useOnboardingForm from "./useOnboardingForm";
import AboutYouStep from "./steps/AboutYouStep";
import SkillsStep from "./steps/SkillsStep";
import EducationStep from "./steps/EducationStep";
import ReviewStep from "./steps/ReviewStep";

const steps = [
  { title: "About you", description: "Your developer identity" },
  { title: "Skills", description: "What you work with" },
  { title: "Education", description: "Your background" },
  { title: "Review", description: "Complete your profile" },
];

const stepComponents = [
  AboutYouStep,
  SkillsStep,
  EducationStep,
  ReviewStep,
];

export default function Onboarding() {
  const { user } = useAuth();
  const form = useOnboardingForm();
  const contentRef = useRef(null);

  const StepComponent = stepComponents[form.step];

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: reducedMotion ? 0 : 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: reducedMotion ? 0 : 0.35,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    form.submit();
  };

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-heading">
            Let's get you set up.
          </h1>

          <p className="mt-2 text-muted">
            Step {form.step + 1} of {steps.length}
          </p>
        </header>

        <div className="mb-8 h-1.5 rounded-full bg-surface-soft">
          <div
            className="h-full rounded-full bg-brand-500 transition-[width] duration-300"
            style={{
              width: `${((form.step + 1) / steps.length) * 100}%`,
            }}
          />
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div
            ref={contentRef}
            className="rounded-2xl border border-border bg-surface/60 p-5 sm:p-8"
          >
            <h2 className="mb-6 text-xl font-semibold text-heading">
              {steps[form.step].title}
            </h2>

            <StepComponent form={form} user={user} />
          </div>

          {form.formError && (
            <p role="alert" className="mt-4 text-sm text-danger">
              {form.formError}
            </p>
          )}

          <div className="mt-6 flex justify-between gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={form.back}
              disabled={form.step === 0}
            >
              <ArrowLeft size={16} />
              Back
            </Button>

            {form.step < 3 ? (
              <Button type="button" onClick={form.next}>
                Continue
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button type="submit">
                Prepare profile
              </Button>
            )}
          </div>

          {form.status && (
            <p role="status" className="mt-4 text-sm text-brand-400">
              {form.status}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}