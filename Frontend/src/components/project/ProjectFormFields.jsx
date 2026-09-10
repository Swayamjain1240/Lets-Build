import {
  PROJECT_STATUS_OPTIONS,
} from "../../utils/projectValidation.js";

const fieldClass = `
  w-full rounded-xl border border-border
  bg-background px-4 py-3
  text-sm text-heading outline-none
  transition-colors placeholder:text-muted
  focus:border-brand-500/50
`;

function Field({ label, htmlFor, error, children }) {
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

export default function ProjectFormFields({
  formData,
  errors,
  onChange,
  disabled = false,
}) {
  return (
    <div className="space-y-6">
      <Field
        label="Project title"
        htmlFor="project-title"
        error={errors.title}
      >
        <input
          id="project-title"
          name="title"
          value={formData.title}
          onChange={onChange}
          disabled={disabled}
          placeholder="AI Resume Analyzer"
          className={fieldClass}
        />
      </Field>

      <Field
        label="Project description"
        htmlFor="project-description"
        error={errors.description}
      >
        <textarea
          id="project-description"
          name="description"
          value={formData.description}
          onChange={onChange}
          disabled={disabled}
          rows={6}
          placeholder="Describe your idea, goals, and what you want to build..."
          className={fieldClass}
        />

        <p className="mt-2 text-xs leading-5 text-muted">
          This description belongs to your private
          project workspace. Public recruitment will
          use a separate public summary.
        </p>
      </Field>

      <Field
        label="Required skills"
        htmlFor="project-skills"
        error={errors.requiredSkills}
      >
        <input
          id="project-skills"
          name="requiredSkills"
          value={formData.requiredSkills}
          onChange={onChange}
          disabled={disabled}
          placeholder="React, Node.js, Python"
          className={fieldClass}
        />

        <p className="mt-2 text-xs text-muted">
          Separate skills using commas.
        </p>
      </Field>

      <Field
        label="Project status"
        htmlFor="project-status"
        error={errors.status}
      >
        <select
          id="project-status"
          name="status"
          value={formData.status}
          onChange={onChange}
          disabled={disabled}
          className={fieldClass}
        >
          {PROJECT_STATUS_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
}