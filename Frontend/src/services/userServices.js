import api from "./api.js";

export const getMyProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

export const completeOnboarding = async (formData) => {
  const response = await api.post(
    "/user/onboarding",
    formData
  );

  return response.data;
};

export const updateMyProfile = async (formData) => {
  const response = await api.put(
    "/user/profile",
    formData
  );

  return response.data;
};

export const getDevelopers = async () => {
  const response = await api.get("/user/developers");
  return response.data;
}

export const getDeveloperById = async (developerId) => {
  const response = await api.get(`/user/${developerId}`);
  return response.data;
}