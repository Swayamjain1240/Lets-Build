import Input from "../../../components/common/Input.jsx";
import {
  getOnboardingSkills,
} from "../../../utils/onboardingValidation.js";

export default function ReviewStep({ form, user }) {
  const { formData, errors, change } = form;

  const skills = getOnboardingSkills(formData.skills);

  return (
    <div className="space-y-6">
      <Input
        id="githubUrl"
        name="githubUrl"
        label="GitHub URL"
        type="url"
        value={formData.githubUrl}
        onChange={change}
        placeholder="https://github.com/your-username"
        error={errors.githubUrl}
      />

      <Input
        id="linkedinUrl"
        name="linkedinUrl"
        label="LinkedIn URL"
        type="url"
        value={formData.linkedinUrl}
        onChange={change}
        placeholder="https://linkedin.com/in/your-profile"
        error={errors.linkedinUrl}
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
            <span className="text-muted">Bio: </span>
            <span className="text-heading">
              {formData.bio || "Not added"}
            </span>
          </div>

          <div>
            <span className="text-muted">Skills: </span>
            <span className="text-heading">
              {skills.join(", ") || "Not added"}
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
  );
}