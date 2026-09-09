import {
  ArrowRight,
  FolderKanban,
  Search,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import DeveloperCard from "../../components/user/DeveloperCard.jsx";
import ProfileSkeleton from "../../components/user/ProfileSkeleton.jsx";

import useAuth from "../../hooks/useAuth.js";
import useDevelopers from "../../hooks/useDevelopers.js";

import {
  gsap,
  useGSAP,
} from "../../lib/gsap.js";

export default function Home() {
  const { user } = useAuth();

  const {
    developers,
    loading,
    error,
  } = useDevelopers();

  const firstName =
    user?.name?.split(" ")[0] ||
    "Developer";

  const developerPreview =
    developers
      .filter(
        (developer) =>
          developer._id !== user?._id
      )
      .slice(0, 3);

  useGSAP(() => {
    gsap.from(".home-intro", {
      opacity: 0,
      y: 12,
      duration: 0.55,
      ease: "power3.out",
    });

    gsap.from(".quick-action", {
      opacity: 0,
      y: 12,
      stagger: 0.08,
      duration: 0.45,
      delay: 0.1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="space-y-10">
      <header className="home-intro">
        <p className="text-sm font-medium text-brand-400">
          Your workspace
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading">
          Welcome back, {firstName}.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Discover developers, build your
          team and manage your projects
          from one workspace.
        </p>
      </header>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-heading">
          Quick actions
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <QuickAction
            to="/developers"
            icon={Users}
            title="Find developers"
            description="Discover people based on skills and experience."
          />

          <QuickAction
            to="/projects"
            icon={FolderKanban}
            title="My projects"
            description="Manage your private project workspaces."
          />

          <QuickAction
            to="/recruitments"
            icon={Search}
            title="Recruitments"
            description="Explore public collaboration opportunities."
          />
        </div>
      </section>

      {/* Developers */}
      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-heading">
              Discover developers
            </h2>

            <p className="mt-1 text-sm text-muted">
              Find people who can help
              bring your ideas to life.
            </p>
          </div>

          <Link
            to="/developers"
            className="flex shrink-0 items-center gap-2 text-sm font-medium text-brand-400 hover:text-brand-300"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <ProfileSkeleton cards={3} />
        ) : error ? (
          <div className="rounded-2xl border border-border bg-surface p-6 text-sm text-muted">
            Developers are temporarily
            unavailable.
          </div>
        ) : developerPreview.length ===
          0 ? (
          <div className="rounded-2xl border border-border bg-surface p-8 text-center">
            <Users
              size={28}
              className="mx-auto text-muted"
            />

            <p className="mt-3 text-sm text-muted">
              No other developers are
              available yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {developerPreview.map(
              (developer) => (
                <DeveloperCard
                  key={developer._id}
                  developer={developer}
                />
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function QuickAction({
  to,
  icon: Icon,
  title,
  description,
}) {
  return (
    <Link
      to={to}
      className="
        quick-action group
        rounded-2xl border border-border
        bg-surface p-5
        transition-all duration-200
        hover:-translate-y-0.5
        hover:border-brand-500/25
      "
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10">
        <Icon
          size={19}
          className="text-brand-400"
        />
      </div>

      <h3 className="mt-4 font-semibold text-heading">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-muted">
        {description}
      </p>

      <ArrowRight
        size={17}
        className="mt-4 text-muted transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}