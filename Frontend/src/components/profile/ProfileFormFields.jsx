import Avatar from "../user/Avatar.jsx";

const fieldClass = `
  w-full rounded-xl
  border border-border
  bg-background
  px-4 py-3
  text-sm text-heading
  outline-none
  transition-colors
  placeholder:text-muted
  focus:border-brand-500/50
`;

export default function ProfileFormFields({
    form,
    userName,
}) {
    const {
        formData,
        existingImage,
        previewUrl,
        errors,
        change,
        changeImage,
    } = form;

    return (
        <div className="space-y-6">
            {/* Profile Picture */}
            <section>
                <label className="text-sm font-medium text-heading">
                    Profile picture
                </label>

                <div className="mt-3 flex items-center gap-4">
                    <Avatar
                        src={
                            previewUrl ||
                            existingImage
                        }
                        name={userName}
                        size="xl"
                    />

                    <div>
                        <label className="inline-flex cursor-pointer rounded-xl border border-border px-4 py-2 text-sm text-heading hover:bg-background">
                            Change photo

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={
                                    changeImage
                                }
                                className="hidden"
                            />
                        </label>

                        <p className="mt-2 text-xs text-muted">
                            JPG, PNG or WebP.
                            Maximum 5 MB.
                        </p>

                        {errors.profilePicture && (
                            <p className="mt-1 text-xs text-red-400">
                                {
                                    errors.profilePicture
                                }
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Bio */}
            <Field
                label="Bio"
                error={errors.bio}
            >
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={change}
                    rows={5}
                    maxLength={500}
                    placeholder="Tell developers about yourself..."
                    className={fieldClass}
                />

                <p className="mt-1 text-right text-xs text-muted">
                    {formData.bio.length}/500
                </p>
            </Field>

            {/* Skills */}
            <Field
                label="Skills"
                error={errors.skills}
            >
                <input
                    name="skills"
                    value={formData.skills}
                    onChange={change}
                    placeholder="React, Node.js, Python"
                    className={fieldClass}
                />

                <p className="mt-1 text-xs text-muted">
                    Separate skills using
                    commas.
                </p>
            </Field>

            {/* Experience */}
            <Field
                label="Experience"
                error={
                    errors.experience
                }
            >
                <select
                    name="experience"
                    value={
                        formData.experience
                    }
                    onChange={change}
                    className={fieldClass}
                >
                    <option value="Beginner">
                        Beginner
                    </option>
                    <option value="Intermediate">
                        Intermediate
                    </option>
                    <option value="Advanced">
                        Advanced
                    </option>
                </select>
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
                <Field
                    label="College"
                    error={
                        errors.collegeName
                    }
                >
                    <input
                        name="college.name"
                        value={
                            formData.college.name
                        }
                        onChange={change}
                        className={fieldClass}
                    />
                </Field>

                <Field
                    label="Branch"
                    error={errors.branch}
                >
                    <input
                        name="college.branch"
                        value={
                            formData.college
                                .branch
                        }
                        onChange={change}
                        className={fieldClass}
                    />
                </Field>
            </div>

            <Field
                label="Passing year"
                error={
                    errors.passingYear
                }
            >
                <input
                    type="number"
                    name="college.passingYear"
                    value={
                        formData.college
                            .passingYear
                    }
                    onChange={change}
                    className={fieldClass}
                />
            </Field>

            <Field
                label="GitHub URL"
                error={errors.githubUrl}
            >
                <input
                    name="githubUrl"
                    value={
                        formData.githubUrl
                    }
                    onChange={change}
                    placeholder="https://github.com/username"
                    className={fieldClass}
                />
            </Field>

            <Field
                label="LinkedIn URL"
                error={
                    errors.linkedinUrl
                }
            >
                <input
                    name="linkedinUrl"
                    value={
                        formData.linkedinUrl
                    }
                    onChange={change}
                    placeholder="https://linkedin.com/in/username"
                    className={fieldClass}
                />
            </Field>
        </div>
    );
}

function Field({
    label,
    error,
    children,
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-heading">
                {label}
            </label>

            {children}

            {error && (
                <p className="mt-1 text-xs text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}