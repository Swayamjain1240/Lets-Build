import { Check } from "lucide-react";

export default function OnboardingProgress({
  steps,
  currentStep,
}) {
  const progress =
    ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-heading">
          {steps[currentStep].title}
        </span>

        <span className="text-xs text-muted">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-surface-soft">
        <div
          className="h-full rounded-full bg-brand-500 transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {steps.map((item, index) => (
          <div
            key={item.title}
            className="flex min-w-0 items-center gap-2"
          >
            <span
              className={`
                flex h-6 w-6 shrink-0 items-center
                justify-center rounded-full text-xs font-semibold
                ${
                  index <= currentStep
                    ? "bg-brand-500/15 text-brand-400"
                    : "bg-surface-soft text-muted"
                }
              `}
              aria-current={
                index === currentStep ? "step" : undefined
              }
            >
              {index < currentStep ? (
                <Check size={14} />
              ) : (
                index + 1
              )}
            </span>

            <span
              className={`hidden truncate text-xs sm:block ${
                index === currentStep
                  ? "text-heading"
                  : "text-muted"
              }`}
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}