import api from "./api";

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