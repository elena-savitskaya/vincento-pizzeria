"use client";

import * as React from "react";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { useCategoryStore } from "@/store";
import { ProductWithRelations } from "@/types/prisma";
import { useEffect } from "react";

type ProductsGroupListProps = {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
};

export const ProductsGroupList = ({
  title,
  items,
  categoryId,
}: ProductsGroupListProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const top = rect.top;
      const bottom = rect.bottom;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      if (top <= windowHeight * 0.3 && bottom >= windowHeight * 0.3) {
        setActiveCategoryId(categoryId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [categoryId, setActiveCategoryId]);

  return (
    <div
      className="flex flex-col gap-2 md:scroll-mt-24 scroll-mt-44"
      id={title}
      ref={ref}
    >
      <Title text={title} size="lg" className="font-extrabold" />
      <div className="grid gap-4 lg:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            ingredients={product.ingredients}
            items={product.items}
          />
        ))}
      </div>
    </div>
  );
};
