import { axiosClient } from "./axiosClient.js";

export const getWishlistRequest = async () => {
  const res = await axiosClient.get("/wishlist");
  return res.data.data; // flat array of Wishlist rows, each with .product
};
export const addToWishlistRequest = async (productId) => {
  const res = await axiosClient.post("/wishlist", { productId });
  return res.data.data;
};
export const removeFromWishlistRequest = async (productId) => {
  const res = await axiosClient.delete(`/wishlist/${productId}`);
  return res.data.data;
};