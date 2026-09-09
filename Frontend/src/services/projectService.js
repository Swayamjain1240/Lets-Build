import api from "./api.js"

const PROJECTS_URL = "/projects";

export const getMyProjects = async (config = {}) => {
  const response = await api.get(PROJECTS_URL, config);
  return response.data;
};

export const getProjectById = async (projectId) => {
  const response = await api.get(
    `${PROJECTS_URL}/${projectId}`
  );

  return response.data;
};

export const createProject = async (projectData) => {
  const response = await api.post(
    PROJECTS_URL,
    projectData
  );

  return response.data;
};

export const updateProject = async (
  projectId,
  projectData
) => {
  const response = await api.put(
    `${PROJECTS_URL}/${projectId}`,
    projectData
  );

  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await api.delete(
    `${PROJECTS_URL}/${projectId}`
  );

  return response.data;
};