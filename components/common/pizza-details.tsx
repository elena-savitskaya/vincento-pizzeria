import { Ingredient } from "@/prisma/generated/prisma";
import { GroupVariants, Variant } from "./group-variants";
import { PizzaSize, PizzaType, pizzaTypes } from "@/types/pizza";

interface PizzaDetailsProps {
  size: PizzaSize;
  type: PizzaType;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  ingredients: Ingredient[];
  textDetaills: string;
  availableSizes: Variant[];
}

export const PizzaDetails = ({
  size,
  type,
  setSize,
  setType,
  ingredients,
  textDetaills,
  availableSizes,
}: PizzaDetailsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-400">
        {ingredients.map((ingredient) => ingredient.name).join(", ")}
      </p>
      <p className="text-sm py-2">{textDetaills}</p>
      <GroupVariants
        items={availableSizes}
        value={String(size)}
        onClick={(value) => setSize(Number(value) as PizzaSize)}
      />
      <GroupVariants
        items={pizzaTypes}
        value={String(type)}
        onClick={(value) => setType(Number(value) as PizzaType)}
      />
    </div>
  );
};
