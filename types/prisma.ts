import { Ingredient, Product, ProductItem } from "@/prisma/generated/prisma";

export type ProductWithRelations = Product & {
  items: ProductItem[];
  ingredients: Ingredient[];
};


