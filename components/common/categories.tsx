"use client";

import React from "react";
import { useCategoryStore } from "@/store";
import { Category } from "@/prisma/generated/prisma";
import { cn } from "@/lib";

type CategoriesProps = {
  items: Category[];
};

export const Categories = ({ items }: CategoriesProps) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  return (
    <div className="w-full max-w-[500px] flex gap-1 sm:gap-3 items-center justify-start rounded-3xl p-1 shadow-inner bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {items.map(({ name, id }, index) => (
        <button
          className={cn(
            'className="flex-1 items-center justify-center basis-[calc(50%-0.5rem)] px-1 py-2 sm:px-2 flex font-bold rounded-3xl transition-colors bg-default',
            categoryActiveId === id &&
              "max-w-[114px] bg-primary text-primary-foreground shadow hover:bg-primary/90"
          )}
          key={index}
          onClick={() => {
            setActiveCategoryId(id);
            document
              .getElementById(name)
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
};
