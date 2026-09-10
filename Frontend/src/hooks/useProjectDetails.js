import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getProjectById,
} from "../../services/projectService.js";

const extractProject = (response) => {
  return (
    response?.data?.project ||
    response?.data ||
    null
  );
};

export default function useProjectDetails(
  projectId
) {
  const [project, setProject] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchProject =
    useCallback(async () => {
      if (!projectId) {
        setError("Project ID is missing.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response =
          await getProjectById(projectId);

        const projectData =
          extractProject(response);

        if (!projectData?._id) {
          throw new Error(
            "Project was not found."
          );
        }

        setProject(projectData);
      } catch (err) {
        console.error(
          "Failed to load project:",
          err
        );

        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load project."
        );

        setProject(null);
      } finally {
        setLoading(false);
      }
    }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return {
    project,
    loading,
    error,
    refresh: fetchProject,
  };
}