import { mapPizzaType, PizzaSize, PizzaType } from "@/types/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  ingredients: CartStateItem["ingredients"],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`Тісто: ${typeName} ${pizzaSize} см`);
  }

  if (ingredients && ingredients.length > 0) {
    const ingredientsList = ingredients
      .map((ingredient) => ingredient.name)
      .join(", ");
    details.push(`Додаткові інгредієнти: ${ingredientsList}`);
  }

  return details.join("\n");
};
