import { axiosClient } from "./axiosClient.js";

export const createOrderRequest = async ({ shippingAddress, paymentMethod }) => {
  const res = await axiosClient.post("/orders", { shippingAddress, paymentMethod });
  return res.data.data;
};
export const getMyOrdersRequest = async () => {
  const res = await axiosClient.get("/orders");
  return res.data.data;
};
export const getOrderRequest = async (id) => {
  const res = await axiosClient.get(`/orders/${id}`);
  return res.data.data;
};