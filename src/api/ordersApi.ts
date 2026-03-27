import api from "./api";
import type { CreateOrderDto, CreateOrderResponse } from "../types/order";

export const createOrder = async (
  data: CreateOrderDto
): Promise<CreateOrderResponse> => {
  const res = await api.post<CreateOrderResponse>("api/orders", data);
  return res.data;
};