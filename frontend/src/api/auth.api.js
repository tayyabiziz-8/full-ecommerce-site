import { axiosClient } from "./axiosClient.js";

export const registerRequest = async (payload) => {
  const res = await axiosClient.post("/auth/register", payload);
  return res.data.data; // { token, user }
};
export const loginRequest = async ({ email, password }) => {
  const res = await axiosClient.post("/auth/login", { email, password });
  return res.data.data; // { token, user }
};
export const logoutRequest = async () => {
  const res = await axiosClient.post("/auth/logout");
  return res.data;
};
export const getCurrentUserRequest = async () => {
  const res = await axiosClient.get("/auth/me");
  return res.data.data.user;
};
export const changePasswordRequest = async ({ oldPassword, newPassword, confirmPassword }) => {
  const res = await axiosClient.post("/auth/change-password", {
    oldPassword,
    newPassword,
    confirmPassword,
  });
  return res.data;
};
export const updateProfilePictureRequest = async (file) => {
  const formData = new FormData();
  formData.append("profilePicture", file);
  const res = await axiosClient.post("/auth/add-profile-picture", formData, {
    headers: { "Content-Type": undefined }, // let the browser set the multipart boundary
  });
  return res.data.data.user;
};