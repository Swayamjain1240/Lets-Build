import {
  CalendarDays,
  GraduationCap,
} from "lucide-react";

export default function ProfileEducation({
  college,
}) {
  const hasCollege =
    college?.name ||
    college?.branch ||
    college?.passingYear;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-2">
        <GraduationCap
          size={19}
          className="text-brand-400"
        />

        <h2 className="font-semibold text-heading">
          Education
        </h2>
      </div>

      {!hasCollege ? (
        <p className="mt-4 text-sm text-muted">
          Education details have not been
          added yet.
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          {college?.name && (
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">
                College
              </p>

              <p className="mt-1 text-sm font-medium text-heading">
                {college.name}
              </p>
            </div>
          )}

          {college?.branch && (
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">
                Branch
              </p>

              <p className="mt-1 text-sm text-body">
                {college.branch}
              </p>
            </div>
          )}

          {college?.passingYear && (
            <div className="flex items-center gap-2 text-sm text-muted">
              <CalendarDays size={16} />

              Passing year:{" "}
              {college.passingYear}
            </div>
          )}
        </div>
      )}
    </section>
  );
}