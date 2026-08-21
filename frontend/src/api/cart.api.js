import { axiosClient } from "./axiosClient.js";

export const getCartRequest = async () => {
  const res = await axiosClient.get("/cart");
  return res.data.data; // Cart with items[].product
};
export const addToCartRequest = async ({ productId, quantity = 1 }) => {
  const res = await axiosClient.post("/cart/items", { productId, quantity });
  return res.data.data;
};
export const updateCartItemRequest = async ({ itemId, quantity }) => {
  const res = await axiosClient.patch(`/cart/items/${itemId}`, { quantity });
  return res.data.data;
};
export const removeCartItemRequest = async (itemId) => {
  const res = await axiosClient.delete(`/cart/items/${itemId}`);
  return res.data.data;
};
export const clearCartRequest = async () => {
  const res = await axiosClient.delete("/cart");
  return res.data.data;
};