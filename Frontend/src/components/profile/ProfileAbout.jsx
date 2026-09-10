import { UserRound } from "lucide-react";

export default function ProfileAbout({
  bio,
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-2">
        <UserRound
          size={19}
          className="text-brand-400"
        />

        <h2 className="font-semibold text-heading">
          About
        </h2>
      </div>

      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
        {bio ||
          "This developer has not added a bio yet."}
      </p>
    </section>
  );
}