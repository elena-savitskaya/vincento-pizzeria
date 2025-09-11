import { Ingredient, ProductItem } from "@/prisma/generated/prisma";
import { PizzaSize, PizzaType, mapPizzaType } from "@/types/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const textDetaills = `${size} см, ${mapPizzaType[type]} тісто`;

  return { totalPrice, textDetaills };
};
