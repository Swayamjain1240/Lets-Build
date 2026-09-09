import Input from "../../../components/common/Input";

export default function SkillsStep({ form }) {
  const { formData, errors, change } = form;

  return (
    <div className="space-y-6">
      <div>
        <Input
          id="skills"
          name="skills"
          label="Your skills"
          type="text"
          value={formData.skills}
          onChange={change}
          placeholder="React, Node.js, MongoDB, Python"
          error={errors.skills}
        />

        <p className="mt-2 text-xs text-muted">
          Separate skills with commas.
        </p>
      </div>

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
          onChange={change}
          aria-invalid={Boolean(errors.experience)}
          aria-describedby={
            errors.experience
              ? "experience-error"
              : undefined
          }
          className="
            w-full rounded-xl border border-border bg-surface
            px-4 py-3 text-sm text-heading outline-none
            focus:border-brand-500/60
          "
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {errors.experience && (
          <p
            id="experience-error"
            className="mt-1.5 text-xs text-danger"
          >
            {errors.experience}
          </p>
        )}
      </div>
    </div>
  );
}