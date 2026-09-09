import { Link } from "react-router-dom";
import {
  ArrowRight,
  FolderKanban,
  Users,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  const firstName =
    user?.name?.split(" ")[0] || "Developer";

  return (
    <div className="space-y-8">
      <header>
        <p className="mb-2 text-sm font-medium text-brand-400">
          Your workspace
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-heading">
          Welcome, {firstName}.
        </h1>

        <p className="mt-3 text-muted">
          Your profile is ready. Start discovering developers
          and building your team.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/developers"
          className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/25"
        >
          <Users size={22} className="text-brand-400" />

          <h2 className="mt-5 font-semibold text-heading">
            Discover developers
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted">
            Find people based on skills and experience.
          </p>

          <ArrowRight
            size={17}
            className="mt-5 text-muted transition-transform group-hover:translate-x-1"
          />
        </Link>

        <Link
          to="/projects"
          className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/25"
        >
          <FolderKanban size={22} className="text-brand-400" />

          <h2 className="mt-5 font-semibold text-heading">
            My projects
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted">
            Manage your private projects and team workspace.
          </p>

          <ArrowRight
            size={17}
            className="mt-5 text-muted transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}