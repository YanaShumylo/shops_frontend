import api from "./api";
import type { Shop } from "../types/shop";

interface GetShopsParams {
  minRating?: number;
  maxRating?: number;
}

export const getShops = async (params?: GetShopsParams) => {
  const { data } = await api.get<{ data: Shop[] }>("/api/shops", { params });
  return data.data; 
};

export const getShopById = async (shopId: string) => {
  const { data } = await api.get<{ data: Shop }>(`/api/shops/${shopId}`);
  return data.data;
};
