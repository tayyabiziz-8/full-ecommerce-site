import { axiosClient } from "./axiosClient.js";

export const getProductsRequest = async ({ categoryId, search, page = 1, limit = 12 } = {}) => {
  const res = await axiosClient.get("/products", {
    params: { categoryId, search, page, limit },
  });
  return res.data.data; // { products, pagination }
};

export const getProductRequest = async (id) => {
  const res = await axiosClient.get(`/products/${id}`);
  return res.data.data;
};