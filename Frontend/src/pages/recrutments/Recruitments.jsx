import {
  useMemo,
  useState,
} from "react";

import {
  Plus,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import RecruitmentFilters from "../../components/recruitment/RecruitmentFilters.jsx";
import RecruitmentGrid from "../../components/recruitment/RecruitmentGrid.jsx";

import useRecruitments from "../../hooks/useRecruitments.js";

const normalize = (value = "") =>
  String(value)
    .toLowerCase()
    .trim();

const getSkillName = (skill) =>
  typeof skill === "string"
    ? skill
    : skill?.displayName ||
      skill?.name ||
      "";

export default function Recruitments() {
  const {
    recruitments,
    loading,
    error,
    refresh,
  } = useRecruitments();

  const [search, setSearch] =
    useState("");

  const [skill, setSkill] =
    useState("");

  const [status, setStatus] =
    useState("");

  const skillOptions =
    useMemo(() => {
      const map = new Map();

      recruitments.forEach(
        (recruitment) => {
          (
            recruitment.requiredSkills ||
            []
          ).forEach((item) => {
            const label =
              getSkillName(item);

            const value =
              normalize(label);

            if (
              value &&
              !map.has(value)
            ) {
              map.set(
                value,
                label
              );
            }
          });
        }
      );

      return Array.from(
        map,
        ([value, label]) => ({
          value,
          label,
        })
      ).sort((a, b) =>
        a.label.localeCompare(
          b.label
        )
      );
    }, [recruitments]);

  const filteredRecruitments =
    useMemo(() => {
      const query =
        normalize(search);

      return recruitments.filter(
        (recruitment) => {
          const skills = (
            recruitment.requiredSkills ||
            []
          ).map((item) =>
            normalize(
              getSkillName(item)
            )
          );

          const searchable = [
            recruitment.title,
            recruitment.publicSummary,
            recruitment.project?.title,
            ...skills,
          ]
            .map(normalize)
            .join(" ");

          const matchesSearch =
            !query ||
            searchable.includes(query);

          const matchesSkill =
            !skill ||
            skills.includes(skill);

          const matchesStatus =
            !status ||
            (status === "open"
              ? recruitment.isOpen
              : !recruitment.isOpen);

          return (
            matchesSearch &&
            matchesSkill &&
            matchesStatus
          );
        }
      );
    }, [
      recruitments,
      search,
      skill,
      status,
    ]);

  const hasFilters =
    Boolean(
      search ||
      skill ||
      status
    );

  const clearFilters = () => {
    setSearch("");
    setSkill("");
    setStatus("");
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-400">
            Collaboration opportunities
          </p>

          <h1 className="mt-2 text-3xl font-bold text-heading">
            Recruitments
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Discover open teams and find
            projects where your skills can
            contribute.
          </p>
        </div>

        <Link
          to="/recruitments/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus size={17} />
          Create Recruitment
        </Link>
      </header>

      <RecruitmentFilters
        search={search}
        skill={skill}
        status={status}
        skillOptions={
          skillOptions
        }
        onSearchChange={
          setSearch
        }
        onSkillChange={
          setSkill
        }
        onStatusChange={
          setStatus
        }
        onClear={clearFilters}
        hasFilters={hasFilters}
      />

      {!loading && !error && (
        <p className="text-sm text-muted">
          {
            filteredRecruitments.length
          }{" "}
          {filteredRecruitments.length ===
          1
            ? "opportunity"
            : "opportunities"}{" "}
          found
        </p>
      )}

      <RecruitmentGrid
        recruitments={
          filteredRecruitments
        }
        loading={loading}
        error={error}
        onRetry={refresh}
      />
    </div>
  );
}