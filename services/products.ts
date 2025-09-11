import { Product } from "@/prisma/generated/prisma";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>(
    ApiRoutes.SearchProducts,
    { params: { query } }
  );

  return data;
};
