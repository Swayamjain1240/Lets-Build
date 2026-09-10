import {
  FileText,
  FolderKanban,
  Wrench,
} from "lucide-react";

import RecruitmentSkillList from "./RecruitmentSkillList.jsx";

export default function RecruitmentOverview({
  recruitment,
}) {
  const project =
    typeof recruitment.project ===
    "object"
      ? recruitment.project
      : null;

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center gap-2">
          <FileText
            size={19}
            className="text-brand-400"
          />

          <h2 className="font-semibold text-heading">
            About the opportunity
          </h2>
        </div>

        <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
          {recruitment.publicSummary ||
            "No public summary available."}
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center gap-2">
          <Wrench
            size={19}
            className="text-brand-400"
          />

          <h2 className="font-semibold text-heading">
            Required skills
          </h2>
        </div>

        <div className="mt-5">
          <RecruitmentSkillList
            skills={
              recruitment.requiredSkills
            }
            limit={10}
          />
        </div>
      </section>

      {project?.title && (
        <section className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center gap-2">
            <FolderKanban
              size={19}
              className="text-brand-400"
            />

            <h2 className="font-semibold text-heading">
              Project
            </h2>
          </div>

          <p className="mt-4 text-sm font-medium text-heading">
            {project.title}
          </p>

          <p className="mt-1 text-xs text-muted">
            Private project details are
            not exposed publicly.
          </p>
        </section>
      )}
    </div>
  );
}