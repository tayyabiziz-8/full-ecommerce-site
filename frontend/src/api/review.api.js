import { axiosClient } from "./axiosClient.js";

export const getProductReviewsRequest = async (productId) => {
  const res = await axiosClient.get(`/reviews/product/${productId}`);
  return res.data.data; // { reviews, averageRating, reviewCount }
};

export const createReviewRequest = async ({ productId, rating, comment }) => {
  const res = await axiosClient.post("/reviews", { productId, rating, comment });
  return res.data.data;
};