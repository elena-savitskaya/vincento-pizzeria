import Image from "next/image";
import { Button } from "@/components/ui";
import { Loader, ShoppingCart } from "lucide-react";
import { Title } from "@/components/common";
import { Ingredient, ProductItem } from "@/prisma/generated/prisma";
import { useAllIngredients, usePizzaOptions } from "@/hooks";
import { getPizzaDetails } from "@/lib";
import { PizzaDetails } from "@/components/common";
import { IngredientDialog } from "@/components/common/dialog";
import { FormIngredientCard } from "@/components/common/form";
import { useState } from "react";

type ProductProps = {
  imageUrl: string;
  name: string;
  onSubmit?: (productItemId?: number, ingredients?: number[]) => void;
  items: ProductItem[];
  ingredients: Ingredient[];
};

export const Product = ({
  name,
  imageUrl,
  onSubmit,
  items,
  ingredients,
}: ProductProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { allIingredients } = useAllIngredients();
  const isPizza = items.some((item) => item.pizzaType !== null);
  const price = items[0].price;

  const {
    size,
    type,
    availableSizes,
    selectedIngredients,
    addIngredient,
    setSize,
    setType,
  } = usePizzaOptions(items);

  const { totalPrice, textDetaills } = getPizzaDetails(
    type,
    size,
    items,
    allIingredients,
    selectedIngredients
  );

  const currentItem = items.find(
    (item) => item.size === size && item.pizzaType === type
  );
  const currentItemId = currentItem?.id;

  const handleClickAdd = async () => {
    setIsLoading(true);
    try {
      if (currentItemId) {
        await onSubmit?.(currentItemId, Array.from(selectedIngredients));
      } else if (!isPizza && items[0]?.id) {
        await onSubmit?.(items[0].id);
      }
    } catch (error) {
      console.error("Помилка при додаванні до кошика:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2">
      <div className="p-3">
        <div className="overflow-hidden md:h-[450px] h-[250px]  relative rounded-lg">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 p-3">
        <Title text={name} size="lg" className="font-extrabold" />
        {isPizza && (
          <div className="flex flex-col gap-3">
            <PizzaDetails
              size={size}
              type={type}
              availableSizes={availableSizes}
              setSize={setSize}
              setType={setType}
              ingredients={ingredients}
              textDetaills={textDetaills}
            />
            <div className="flex flex-col gap-2">
              <Title text="Інгредієнти" size="sm" className="font-bold" />
              <div className="grid grid-cols-3 gap-3 md:grid-cols-4 p-1">
                {ingredients.map((ingredient: Ingredient) => (
                  <FormIngredientCard
                    key={ingredient.id}
                    name={ingredient.name}
                    imageUrl={ingredient.imageUrl}
                  />
                ))}
              </div>
            </div>
            <IngredientDialog
              allIngredients={allIingredients}
              selectedIngredients={selectedIngredients}
              addIngredient={addIngredient}
            />
          </div>
        )}
        <div className="flex flex-col gap-2 items-end w-full">
          <p className="text-[26px]">
            Сума:{" "}
            <span className="font-extrabold">
              {isPizza ? totalPrice : price} грн
            </span>
          </p>
          <Button onClick={handleClickAdd} variant="destructive" size="lg">
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              <ShoppingCart size={16} className="relative" strokeWidth={2} />
            )}
            В кошик
          </Button>
        </div>
      </div>
    </div>
  );
};
