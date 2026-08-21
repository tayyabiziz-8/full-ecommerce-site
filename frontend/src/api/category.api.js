import { axiosClient } from "./axiosClient.js";

export const getCategoriesRequest = async () => {
  const res = await axiosClient.get("/categories");
  return res.data.data; // flat array; top-level rows include nested subCategories
};