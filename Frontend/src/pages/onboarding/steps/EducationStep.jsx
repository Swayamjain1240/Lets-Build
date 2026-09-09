import Input from "../../../components/common/Input";

export default function EducationStep({ form }) {
  const { formData, errors, change } = form;

  return (
    <div className="space-y-5">
      <Input
        id="collegeName"
        name="college.name"
        label="College / University"
        type="text"
        value={formData.college.name}
        onChange={change}
        placeholder="Your college name"
        error={errors.collegeName}
      />

      <Input
        id="branch"
        name="college.branch"
        label="Branch"
        type="text"
        value={formData.college.branch}
        onChange={change}
        placeholder="Computer Science, AIML, etc."
        error={errors.branch}
      />

      <Input
        id="passingYear"
        name="college.passingYear"
        label="Passing year"
        type="number"
        value={formData.college.passingYear}
        onChange={change}
        placeholder="2027"
        error={errors.passingYear}
      />
    </div>
  );
}