import api from "./api";
import type { Product } from "../types/product";

interface GetProductsParams {
  shopId: string;
  categories?: string[];
  sortBy?: string;
  order?: string;
}

export const getProducts = async ({
  shopId,
  categories,
  sortBy,
  order,
}: GetProductsParams): Promise<Product[]> => {
  const { data } = await api.get(`api/shops/${shopId}/products`, {
    params: {
      categories,
      sortBy,
      order,
    },
  });

  return data.data;
};