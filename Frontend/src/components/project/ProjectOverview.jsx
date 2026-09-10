import {
    FileText,
    Wrench,
} from "lucide-react";
import ProjectSkillList from "./ProjectSkillList.jsx";

export default function ProjectOverview({
    project,
}) {
    return (
        <div className="space-y-5">
            <section className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-2">
                    <FileText
                        size={19}
                        className="text-brand-400"
                    />

                    <h2 className="font-semibold text-heading">
                        Project description
                    </h2>
                </div>

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
                    {project.description ||
                        "No project description added."}
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
                    <ProjectSkillList
                        skills={
                            project.requiredSkills
                        }
                        rawSkills={
                            project.rawRequiredSkills
                        }
                        limit={10}
                    />
                </div>
            </section>
        </div>
    );
}