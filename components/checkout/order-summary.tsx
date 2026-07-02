"use client";

import { getCartItemDetails, CartStateItem } from "@/lib";
import { PizzaSize, PizzaType } from "@/types/pizza";

interface OrderSummaryProps {
  cartItems: CartStateItem[];
  totalAmount: number;
}

export const OrderSummary = ({
  cartItems,
  totalAmount,
}: OrderSummaryProps) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-card rounded-lg border border-border">
      <h2 className="text-xl font-bold">Ваше замовлення</h2>
      <div className="flex flex-col gap-3">
        {cartItems.map((item, index) => {
          const details = getCartItemDetails(
            item.ingredients,
            item.pizzaType as PizzaType,
            item.pizzaSize as PizzaSize
          );
          const itemTotalPrice = item.price;

          return (
            <div key={item.id}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-base">{item.name}</p>
                  {details && (
                    <p className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap">
                      {details}
                    </p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold">{itemTotalPrice} грн</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} шт
                  </p>
                </div>
              </div>
              {index < cartItems.length - 1 && (
                <div className="border-t border-border/50 mt-3" />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center text-lg border-t-2 border-border pt-4 mt-2">
        <span className="font-bold">Разом:</span>
        <span className="font-extrabold text-2xl">{totalAmount} грн</span>
      </div>
    </div>
  );
};
