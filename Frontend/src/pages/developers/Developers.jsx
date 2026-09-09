import {
  useMemo,
  useState,
} from "react";

import DeveloperFilters from "../../components/user/DeveloperFilters.jsx";
import DeveloperGrid from "../../components/user/DeveloperGrid.jsx";

import useDevelopers from "../../hooks/useDevelopers.js";
import useAuth from "../../hooks/useAuth.js";

import {
  gsap,
  useGSAP,
} from "../../lib/gsap.js";

const normalizeText = (value = "") =>
  String(value)
    .toLowerCase()
    .trim();

const getSkillName = (skill) => {
  if (typeof skill === "string") {
    return skill;
  }

  return (
    skill?.displayName ||
    skill?.name ||
    ""
  );
};

export default function Developers() {
  const { user } = useAuth();

  const {
    developers,
    loading,
    error,
    refresh,
  } = useDevelopers();

  const [search, setSearch] =
    useState("");

  const [skill, setSkill] =
    useState("");

  const [experience, setExperience] =
    useState("");

  const otherDevelopers = useMemo(() => {
    return developers.filter(
      (developer) =>
        developer._id !== user?._id
    );
  }, [developers, user?._id]);

  const skillOptions = useMemo(() => {
    const skillMap = new Map();

    otherDevelopers.forEach(
      (developer) => {
        const allSkills =
          developer.skills?.length > 0
            ? developer.skills
            : developer.rawSkills || [];

        allSkills.forEach((item) => {
          const label =
            getSkillName(item);

          const value =
            normalizeText(label);

          if (value && !skillMap.has(value)) {
            skillMap.set(value, label);
          }
        });
      }
    );

    return Array.from(
      skillMap,
      ([value, label]) => ({
        value,
        label,
      })
    ).sort((a, b) =>
      a.label.localeCompare(b.label)
    );
  }, [otherDevelopers]);

  const filteredDevelopers =
    useMemo(() => {
      const query =
        normalizeText(search);

      return otherDevelopers.filter(
        (developer) => {
          const allSkills =
            developer.skills?.length > 0
              ? developer.skills
              : developer.rawSkills || [];

          const skillNames =
            allSkills.map((item) =>
              normalizeText(
                getSkillName(item)
              )
            );

          const searchableText = [
            developer.name,
            developer.bio,
            developer.college?.name,
            developer.college?.branch,
            ...skillNames,
          ]
            .map(normalizeText)
            .join(" ");

          const matchesSearch =
            !query ||
            searchableText.includes(query);

          const matchesSkill =
            !skill ||
            skillNames.includes(skill);

          const matchesExperience =
            !experience ||
            developer.experience ===
              experience;

          return (
            matchesSearch &&
            matchesSkill &&
            matchesExperience
          );
        }
      );
    }, [
      otherDevelopers,
      search,
      skill,
      experience,
    ]);

  const hasFilters =
    Boolean(
      search ||
      skill ||
      experience
    );

  const clearFilters = () => {
    setSearch("");
    setSkill("");
    setExperience("");
  };

  useGSAP(() => {
    gsap.from(".developers-header", {
      opacity: 0,
      y: 14,
      duration: 0.55,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="space-y-6">
      <header className="developers-header">
        <p className="text-sm font-medium text-brand-400">
          Developer discovery
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading">
          Find your next teammate
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Search developers by their
          skills, experience and profile
          information.
        </p>
      </header>

      <DeveloperFilters
        search={search}
        skill={skill}
        experience={experience}
        skillOptions={skillOptions}
        onSearchChange={setSearch}
        onSkillChange={setSkill}
        onExperienceChange={
          setExperience
        }
        onClear={clearFilters}
        hasFilters={hasFilters}
      />

      {!loading && !error && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted">
            {filteredDevelopers.length}{" "}
            developer
            {filteredDevelopers.length ===
            1
              ? ""
              : "s"}{" "}
            found
          </p>
        </div>
      )}

      <DeveloperGrid
        developers={
          filteredDevelopers
        }
        loading={loading}
        error={error}
        onRetry={refresh}
      />
    </div>
  );
}