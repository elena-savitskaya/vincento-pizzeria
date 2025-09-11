"use client";

import qs from "qs";
import { useEffect, useRef } from "react";
import { Filters } from "./use-filters";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
  const isMounted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
      isNew: Array.from(filters.isNew),
    };

    const query = qs.stringify(params, { arrayFormat: "comma" });
    router.push(`?${query}`, { scroll: false });
  }, [
    filters.prices.priceFrom,
    filters.prices.priceTo,
    filters.pizzaTypes,
    filters.sizes,
    filters.selectedIngredients,
    filters.isNew,
  ]);
};
