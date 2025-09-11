"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useSet } from "react-use";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
  isNew: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
  isNew: Set<string>;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
  setIsNew: (value: string) => void;
  resetFilters: () => void;
}

export const useFilters = (): ReturnProps => {
  const router = useRouter();

  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(",") || [])
  );

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has("pizzaTypes")
        ? searchParams.get("pizzaTypes")?.split(",")
        : []
    )
  );

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isNew, { toggle: toggleIsNew }] = useSet(
    new Set<string>(searchParams.get("isNew")?.split(",") || [])
  );

  const resetFilters = () => {
    selectedIngredients.forEach((ingredient) => toggleIngredients(ingredient));
    sizes.forEach((size) => toggleSizes(size));
    pizzaTypes.forEach((pizzaType) => togglePizzaTypes(pizzaType));
    setPrices({ priceFrom: undefined, priceTo: undefined });
    isNew.forEach((newValue) => toggleIsNew(newValue));

    router.replace("?", { scroll: false });
  };

  return useMemo(
    () => ({
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      isNew,
      setPrices: updatePrice,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
      setIsNew: toggleIsNew,
      resetFilters,
    }),
    [sizes, pizzaTypes, selectedIngredients, prices, isNew]
  );
};
