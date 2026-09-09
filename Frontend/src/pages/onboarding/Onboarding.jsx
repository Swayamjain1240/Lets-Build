import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Camera, CheckCircle2, UserRound } from "lucide-react"

import Inupt from "../../components/common/Input.jsx"
import Button from "../../components/common/Button";
import useAuth from "../../hooks/useAuth";
import { gsap, useGSAP } from "../../lib/gsap";

const steps = [
    { title: "About you", description: "Your developer identity" },
    { title: "Skills", description: "What you work with" },
    { title: "Education", description: "Your background" },
    { title: "Review", description: "Complete your profile" },
];

const fieldClassName = `
  w-full rounded-xl border border-border bg-surface
  px-4 py-3 text-sm text-heading outline-none
  placeholder:text-muted transition-colors duration-200
  focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/10
`;

const Onboarding = () => {
    const { user } = useAuth();
    const stepRef = useRef(null);

    const [step, setStep] = useState(0);
    const [previewUrl, setPreviewUrl] = useState("");
    const [status, setStatus] = useState("");

    const [formData, setFormData] = useState({
        profilePicture: null,
        bio: "",
        skills: "",
        experience: "Beginner",
        college: {
            name: "",
            branch: "",
            passingYear: "",
        },
        githubUrl: "",
        linkedinUrl: "",
    });

    useEffect(() => {
        if (!formData.profilePicture) {
            setPreviewUrl("");
            return;
        }

        const url = URL.createObjectURL(formData.profilePicture);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [formData.profilePicture]);

    useGSAP(
        () => {
            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            gsap.fromTo(
                ".step-content",
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
            scope: stepRef,
            dependencies: [step],
            revertOnUpdate: true,
        }
    );

    const updateField = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setStatus("");
    };

    const updateCollege = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            college: {
                ...previous.college,
                [name]: value,
            },
        }));

        setStatus("");
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setFormData((previous) => ({
            ...previous,
            profilePicture: file,
        }));

        setStatus("");
    };

    const nextStep = () => {
        setStatus("");
        setStep((previous) => Math.min(previous + 1, steps.length - 1));
    };

    const previousStep = () => {
        setStatus("");
        setStep((previous) => Math.max(previous - 1, 0));
    };

    // Part 4.4 will replace this with the real API submission.
    const handleSubmit = (event) => {
        event.preventDefault();

        setStatus(
            "Profile draft is ready. Backend saving will be connected in Part 4.4."
        );
    };

    const imageSource = previewUrl || user?.profilePicture;

    return (
        <main className="min-h-screen bg-background px-5 py-10 text-body sm:px-8">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <header className="mb-10">
                    <div className="mb-6 flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 font-bold text-white">
                            L
                        </div>

                        <span className="text-lg font-bold tracking-tight text-heading">
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
                        Add the details that help other developers understand your skills
                        and collaboration interests.
                    </p>
                </header>

                {/* Progress */}
                <div className="mb-8">
                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-heading">
                            {steps[step].title}
                        </span>

                        <span className="text-xs text-muted">
                            Step {step + 1} of {steps.length}
                        </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-soft">
                        <div
                            className="h-full rounded-full bg-brand-500 transition-[width] duration-300"
                            style={{
                                width: `${((step + 1) / steps.length) * 100}%`,
                            }}
                        />
                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-2">
                        {steps.map((item, index) => (
                            <div key={item.title} className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`
                      flex h-6 w-6 shrink-0 items-center justify-center
                      rounded-full text-xs font-semibold
                      ${index <= step
                                                ? "bg-brand-500/15 text-brand-400"
                                                : "bg-surface-soft text-muted"
                                            }
                    `}
                                        aria-current={index === step ? "step" : undefined}
                                    >
                                        {index < step ? <CheckCircle2 size={14} /> : index + 1}
                                    </span>

                                    <span
                                        className={`hidden truncate text-xs sm:block ${index === step ? "text-heading" : "text-muted"
                                            }`}
                                    >
                                        {item.title}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div
                        ref={stepRef}
                        className="rounded-2xl border border-border bg-surface/60 p-5 sm:p-8"
                    >
                        <div className="step-content">
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-heading">
                                    {steps[step].title}
                                </h2>

                                <p className="mt-2 text-sm text-muted">
                                    {steps[step].description}
                                </p>
                            </div>

                            {/* STEP 1 — ABOUT YOU */}
                            {step === 0 && (
                                <div className="space-y-6">
                                    <div>
                                        <label className="mb-3 block text-sm font-medium text-body">
                                            Profile picture
                                        </label>

                                        <div className="flex flex-wrap items-center gap-5">
                                            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-soft">
                                                {imageSource ? (
                                                    <img
                                                        src={imageSource}
                                                        alt="Profile preview"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <UserRound size={32} className="text-muted" />
                                                )}
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="profilePicture"
                                                    className="
                            inline-flex cursor-pointer items-center gap-2
                            rounded-xl border border-border bg-surface
                            px-4 py-2.5 text-sm font-medium text-heading
                            transition-colors hover:bg-surface-hover
                          "
                                                >
                                                    <Camera size={16} />
                                                    Choose photo
                                                </label>

                                                <input
                                                    id="profilePicture"
                                                    name="profilePicture"
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/webp"
                                                    onChange={handleImageChange}
                                                    className="sr-only"
                                                />

                                                <p className="mt-2 text-xs text-muted">
                                                    JPG, PNG or WebP. Image validation comes next.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="mb-2 text-sm font-medium text-body">
                                            Full name
                                        </p>

                                        <div className="rounded-xl border border-border bg-surface-soft px-4 py-3 text-sm text-heading">
                                            {user?.name || "Your name"}
                                        </div>

                                        <p className="mt-2 text-xs text-muted">
                                            This comes from your signup account.
                                        </p>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="bio"
                                            className="mb-2 block text-sm font-medium text-body"
                                        >
                                            Bio
                                        </label>

                                        <textarea
                                            id="bio"
                                            name="bio"
                                            rows={4}
                                            value={formData.bio}
                                            onChange={updateField}
                                            placeholder="Tell other developers what you enjoy building and what you're looking to collaborate on."
                                            className={`${fieldClassName} resize-y`}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* STEP 2 — SKILLS */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <Input
                                        id="skills"
                                        name="skills"
                                        label="Your skills"
                                        type="text"
                                        value={formData.skills}
                                        onChange={updateField}
                                        placeholder="React, Node.js, MongoDB, Python"
                                    />

                                    <p className="-mt-4 text-xs text-muted">
                                        Separate skills with commas. We'll normalize them when
                                        saving your profile.
                                    </p>

                                    <div>
                                        <label
                                            htmlFor="experience"
                                            className="mb-2 block text-sm font-medium text-body"
                                        >
                                            Experience level
                                        </label>

                                        <select
                                            id="experience"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={updateField}
                                            className={fieldClassName}
                                        >
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3 — EDUCATION */}
                            {step === 2 && (
                                <div className="space-y-5">
                                    <Input
                                        id="collegeName"
                                        name="name"
                                        label="College / University"
                                        type="text"
                                        value={formData.college.name}
                                        onChange={updateCollege}
                                        placeholder="Your college name"
                                    />

                                    <Input
                                        id="branch"
                                        name="branch"
                                        label="Branch"
                                        type="text"
                                        value={formData.college.branch}
                                        onChange={updateCollege}
                                        placeholder="Computer Science, AIML, etc."
                                    />

                                    <Input
                                        id="passingYear"
                                        name="passingYear"
                                        label="Passing year"
                                        type="number"
                                        value={formData.college.passingYear}
                                        onChange={updateCollege}
                                        placeholder="2027"
                                    />
                                </div>
                            )}

                            {/* STEP 4 — LINKS + REVIEW */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <Input
                                        id="githubUrl"
                                        name="githubUrl"
                                        label="GitHub URL"
                                        type="url"
                                        value={formData.githubUrl}
                                        onChange={updateField}
                                        placeholder="https://github.com/your-username"
                                    />

                                    <Input
                                        id="linkedinUrl"
                                        name="linkedinUrl"
                                        label="LinkedIn URL"
                                        type="url"
                                        value={formData.linkedinUrl}
                                        onChange={updateField}
                                        placeholder="https://linkedin.com/in/your-profile"
                                    />

                                    <div className="border-t border-border pt-6">
                                        <h3 className="mb-4 text-sm font-semibold text-heading">
                                            Profile preview
                                        </h3>

                                        <div className="space-y-3 text-sm">
                                            <div>
                                                <span className="text-muted">Name: </span>
                                                <span className="text-heading">
                                                    {user?.name || "—"}
                                                </span>
                                            </div>

                                            <div>
                                                <span className="text-muted">Skills: </span>
                                                <span className="text-heading">
                                                    {formData.skills || "Not added"}
                                                </span>
                                            </div>

                                            <div>
                                                <span className="text-muted">Experience: </span>
                                                <span className="text-heading">
                                                    {formData.experience}
                                                </span>
                                            </div>

                                            <div>
                                                <span className="text-muted">College: </span>
                                                <span className="text-heading">
                                                    {formData.college.name || "Not added"}
                                                </span>
                                            </div>

                                            <div>
                                                <span className="text-muted">Profile photo: </span>
                                                <span className="text-heading">
                                                    {formData.profilePicture?.name ||
                                                        (user?.profilePicture
                                                            ? "Existing photo"
                                                            : "Not selected")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-6 flex items-center justify-between gap-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={previousStep}
                            disabled={step === 0}
                        >
                            <ArrowLeft size={16} />
                            Back
                        </Button>

                        {step < steps.length - 1 ? (
                            <Button type="button" onClick={nextStep}>
                                Continue
                                <ArrowRight size={16} />
                            </Button>
                        ) : (
                            <Button type="submit">
                                Prepare profile
                                <CheckCircle2 size={16} />
                            </Button>
                        )}
                    </div>

                    {status && (
                        <p
                            role="status"
                            aria-live="polite"
                            className="mt-5 rounded-xl border border-brand-500/20 bg-brand-500/5 px-4 py-3 text-sm text-brand-400"
                        >
                            {status}
                        </p>
                    )}
                </form>
            </div>
        </main>
    );
}

export default Onboarding;