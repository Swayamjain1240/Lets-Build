import Input from "../../../components/common/Input";

export default function SkillsStep({ form }) {
  const { formData, errors, change } = form;

  return (
    <div className="space-y-6">
      <Input
        id="skills"
        name="skills"
        label="Your skills"
        value={formData.skills}
        onChange={change}
        placeholder="React, Node.js, MongoDB, Python"
        error={errors.skills}
      />

      <div>
        <label htmlFor="experience" className="mb-2 block text-sm">
          Experience level
        </label>

        <select
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={change}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
}