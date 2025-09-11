"use client";

import { useCartStore } from "@/store";
import { ProductWithRelations } from "@/types/prisma";
import { toastError, toastSuccess } from "@/lib";
import { Product } from "./product";

interface ProductFormProps {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm = ({
  product,
  onSubmit: _onSubmit,
}: ProductFormProps) => {
  const addCartItem = useCartStore((state) => state.addCartItem);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? product.items[0]?.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toastSuccess("Товар додано у кошик");

      _onSubmit?.();
    } catch (err) {
      toastError("Не вдалося додати товар до кошику");
      console.error(err);
    }
  };

  return (
    <Product
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      ingredients={product.ingredients}
      items={product.items}
    />
  );
};
