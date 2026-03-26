import api from "./api";

export const getShops = async () => {
  const { data } = await api.get("/shops");
  return data;
};

export const getShopById = async (shopId: string) => {
  const { data } = await api.get(`/shops/${shopId}`);
  return data;
};