"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import { Title, PizzaDetails } from "@/components/common";
import { Ingredient, ProductItem } from "@/prisma/generated/prisma";
import { getPizzaDetails, toastError, toastSuccess } from "@/lib";
import { useCart, usePizzaOptions } from "@/hooks";

type ProductCardProps = {
  id: number;
  name: string;
  imageUrl: string;
  ingredients: Ingredient[];
  items: ProductItem[];
};

export const ProductCard = ({
  id,
  name,
  items,
  imageUrl,
  ingredients,
}: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addCartItem } = useCart();
  const isPizza = items.some((item) => item.pizzaType !== null);
  const price = items[0].price;

  const { size, availableSizes, type, selectedIngredients, setSize, setType } =
    usePizzaOptions(items);

  const { totalPrice, textDetaills } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const currentItem = items.find(
    (item) => item.size === size && item.pizzaType === type
  );
  const currentItemId = currentItem?.id;

  const handleClickAdd = async () => {
    setIsLoading(true);
    try {
      if (isPizza && currentItemId) {
        await addCartItem({
          productItemId: currentItemId,
          ingredients: Array.from(selectedIngredients),
        });
      } else if (!isPizza && items[0]?.id) {
        await addCartItem({
          productItemId: items[0].id,
        });
      }

      toastSuccess("Товар додано у кошик");
    } catch (error) {
      toastError("Не вдалося додати товар до кошику");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-accent rounded-lg shadow-sm border border-input relative z-10">
      <Link href={`/product/${id}`}>
        <div className="overflow-hidden rounded-t-lg h-[200px] relative">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="pointer-events-none object-cover w-full h-full transition-transform duration-300 hover:scale-110"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-3 p-3 justify-between h-full">
        <div className="flex flex-col gap-3">
          <Link href={`/product/${id}`} className="flex flex-col gap-1">
            <Title text={name} size="sm" className="font-bold" />
            {isPizza && (
              <Button variant="secondary" size="lg">
                Додати інгредієнти
              </Button>
            )}
          </Link>
          {isPizza && (
            <PizzaDetails
              size={size}
              type={type}
              setSize={setSize}
              setType={setType}
              ingredients={ingredients}
              textDetaills={textDetaills}
              availableSizes={availableSizes}
            />
          )}
        </div>
        <div className="flex justify-between items-center p-3">
          <span className="text-[20px]">
            Ціна <b>{isPizza ? totalPrice : price} грн</b>
          </span>
          <Button variant="destructive" onClick={handleClickAdd}>
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              <Plus size={6} />
            )}
            Додати
          </Button>
        </div>
      </div>
    </div>
  );
};
