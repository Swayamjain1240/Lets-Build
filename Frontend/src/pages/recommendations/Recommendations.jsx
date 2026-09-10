import {
  RefreshCw,
  Sparkles,
  Users,
} from "lucide-react";

import {
  useCallback,
  useMemo,
  useState,
} from "react";

import useProjects from "../../hooks/useProjects.js";
import useAuth from "../../hooks/useAuth.js";
import useRecommendations from "../../hooks/useRecommendations.js";

import {
  getDeveloperRecommendations,
  getOpportunityRecommendations,
} from "../../services/recommendationService.js";

import DeveloperRecommendationCard from "../../components/recommendation/DeveloperRecommendationCard.jsx";
import OpportunityRecommendationCard from "../../components/recommendation/OpportunityRecommendationCard.jsx";
import RecommendationSkeleton from "../../components/recommendation/RecommendationSkeleton.jsx";

const getId = (value) =>
  String(
    typeof value === "object"
      ? value?._id || ""
      : value || ""
  );

export default function Recommendations() {
  const { user } = useAuth();

  const {
    projects,
    loading: projectsLoading,
  } = useProjects();

  const ownedProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          getId(project.owner) ===
          getId(user?._id)
      ),
    [projects, user?._id]
  );

  const [
    selectedProject,
    setSelectedProject,
  ] = useState("");

  const opportunityFetcher =
    useCallback(
      (config) =>
        getOpportunityRecommendations(
          config
        ),
      []
    );

  const developerFetcher =
    useCallback(
      (config) =>
        getDeveloperRecommendations(
          selectedProject,
          config
        ),
      [selectedProject]
    );

  const opportunities =
    useRecommendations({
      fetchRecommendations:
        opportunityFetcher,
    });

  const developers =
    useRecommendations({
      fetchRecommendations:
        developerFetcher,
      enabled:
        Boolean(selectedProject),
    });

  return (
    <div className="space-y-10">
      <header>
        <div className="flex items-center gap-2 text-brand-400">
          <Sparkles size={18} />

          <p className="text-sm font-medium">
            AI matching
          </p>
        </div>

        <h1 className="mt-2 text-3xl font-bold text-heading">
          Recommendations
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Discover relevant opportunities
          and developers using semantic
          skill matching.
        </p>
      </header>

      <RecommendationSection
        title="Recommended opportunities"
        description="Based on your developer profile and skills."
        state={opportunities}
      >
        {opportunities.recommendations.map(
          (recommendation) => (
            <OpportunityRecommendationCard
              key={
                recommendation.recruitment?._id ||
                recommendation.opportunity?._id ||
                recommendation._id
              }
              recommendation={
                recommendation
              }
            />
          )
        )}
      </RecommendationSection>

      <section className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Users
                size={18}
                className="text-brand-400"
              />

              <h2 className="text-lg font-semibold text-heading">
                Recommended developers
              </h2>
            </div>

            <p className="mt-2 text-sm text-muted">
              Select one of your projects
              to find matching developers.
            </p>
          </div>

          <select
            value={selectedProject}
            onChange={(event) =>
              setSelectedProject(
                event.target.value
              )
            }
            disabled={projectsLoading}
            className="min-w-56 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-heading outline-none"
          >
            <option value="">
              Select project
            </option>

            {ownedProjects.map(
              (project) => (
                <option
                  key={project._id}
                  value={project._id}
                >
                  {project.title}
                </option>
              )
            )}
          </select>
        </div>

        {!selectedProject ? (
          <EmptyState
            message={
              ownedProjects.length === 0
                ? "Create a project first to receive developer recommendations."
                : "Select a project to start AI matching."
            }
          />
        ) : (
          <RecommendationContent
            state={developers}
            type="developers"
          />
        )}
      </section>
    </div>
  );
}

function RecommendationSection({
  title,
  description,
  state,
  children,
}) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-heading">
          {title}
        </h2>

        <p className="mt-1 text-sm text-muted">
          {description}
        </p>
      </div>

      {state.loading ? (
        <RecommendationSkeleton />
      ) : state.error ? (
        <RecommendationError state={state} />
      ) : state.recommendations.length === 0 ? (
        <EmptyState message="No relevant recommendations found yet." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {children}
        </div>
      )}
    </section>
  );
}

function RecommendationContent({
  state,
  type,
}) {
  if (state.loading) {
    return <RecommendationSkeleton />;
  }

  if (state.error) {
    return <RecommendationError state={state} />;
  }

  if (
    state.recommendations.length === 0
  ) {
    return (
      <EmptyState message="No matching developers found for this project." />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {type === "developers" &&
        state.recommendations.map(
          (recommendation) => (
            <DeveloperRecommendationCard
              key={
                recommendation.developer?._id ||
                recommendation.user?._id ||
                recommendation._id
              }
              recommendation={
                recommendation
              }
            />
          )
        )}
    </div>
  );
}

function RecommendationError({
  state,
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8 text-center">
      <p className="text-sm text-muted">
        {state.error}
      </p>

      <button
        type="button"
        onClick={state.refresh}
        className="mx-auto mt-4 flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm text-heading"
      >
        <RefreshCw size={15} />
        Try again
      </button>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-8 text-center text-sm text-muted">
      {message}
    </div>
  );
}