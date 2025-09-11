"use client";

import { Api } from "@/services/api-client";
import { Ingredient } from "@/prisma/generated/prisma";
import { useEffect, useState } from "react";

export const useAllIngredients = () => {
  const [allIingredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const allIingredients = await Api.ingredients.getAll();
        setAllIngredients(allIingredients);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return {
    allIingredients,
    loading,
  };
};
