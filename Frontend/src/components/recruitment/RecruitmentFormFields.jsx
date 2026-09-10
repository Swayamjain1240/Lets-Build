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

function Field({
  label,
  htmlFor,
  error,
  children,
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-heading"
      >
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

export default function RecruitmentFormFields({
  formData,
  errors,
  projects = [],
  onChange,
  disabled = false,
}) {
  return (
    <div className="space-y-6">
      <Field
        label="Project"
        htmlFor="recruitment-project"
        error={errors.project}
      >
        <select
          id="recruitment-project"
          name="project"
          value={formData.project}
          onChange={onChange}
          disabled={disabled}
          className={fieldClass}
        >
          <option value="">
            Select your project
          </option>

          {projects.map((project) => (
            <option
              key={project._id}
              value={project._id}
            >
              {project.title}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Recruitment title"
        htmlFor="recruitment-title"
        error={errors.title}
      >
        <input
          id="recruitment-title"
          name="title"
          value={formData.title}
          onChange={onChange}
          disabled={disabled}
          maxLength={120}
          placeholder="Looking for React Developer"
          className={fieldClass}
        />

        <p className="mt-1 text-right text-xs text-muted">
          {formData.title.length}/120
        </p>
      </Field>

      <Field
        label="Public summary"
        htmlFor="recruitment-summary"
        error={
          errors.publicSummary
        }
      >
        <textarea
          id="recruitment-summary"
          name="publicSummary"
          value={
            formData.publicSummary
          }
          onChange={onChange}
          disabled={disabled}
          rows={6}
          maxLength={700}
          placeholder="Describe the opportunity without exposing private project details..."
          className={fieldClass}
        />

        <div className="mt-2 flex justify-between gap-4">
          <p className="text-xs leading-5 text-muted">
            This information will be visible
            publicly to other developers.
          </p>

          <span className="shrink-0 text-xs text-muted">
            {
              formData.publicSummary
                .length
            }
            /700
          </span>
        </div>
      </Field>

      <Field
        label="Required skills"
        htmlFor="recruitment-skills"
        error={
          errors.requiredSkills
        }
      >
        <input
          id="recruitment-skills"
          name="requiredSkills"
          value={
            formData.requiredSkills
          }
          onChange={onChange}
          disabled={disabled}
          placeholder="React, Tailwind CSS, Node.js"
          className={fieldClass}
        />

        <p className="mt-2 text-xs text-muted">
          Separate skills using commas.
        </p>
      </Field>

      <label className="flex cursor-pointer items-center justify-between gap-5 rounded-xl border border-border bg-background p-4">
        <div>
          <p className="text-sm font-medium text-heading">
            Open recruitment
          </p>

          <p className="mt-1 text-xs text-muted">
            Developers can discover this
            opportunity while it is open.
          </p>
        </div>

        <input
          type="checkbox"
          name="isOpen"
          checked={formData.isOpen}
          onChange={onChange}
          disabled={disabled}
          className="h-4 w-4 accent-violet-500"
        />
      </label>
    </div>
  );
}