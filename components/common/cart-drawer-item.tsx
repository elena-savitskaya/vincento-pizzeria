import React from "react";

import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";
import { cn } from "@/lib";

interface CartDrawerItemProps extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
}

export const CartDrawerItem = ({
  imageUrl,
  name,
  price,
  quantity,
  details,
  disabled,
  onClickCountButton,
  onClickRemove,
}: CartDrawerItemProps) => {
  return (
    <div
      className={cn("flex gap-3 pr-2", {
        "opacity-50 pointer-events-none": disabled,
      })}
    >
      <CartItem.Image src={imageUrl} />
      <div className="flex-1">
        <CartItem.Info name={name} details={details} />
        <hr className="md:my-3 my-1" />
        <div className="w-full flex md:flex-row flex-col items-start md:items-center gap-3 md:justify-between">
          <CountButton onClick={onClickCountButton} value={quantity} />
          <div className="w-full flex items-center gap-3 justify-between">
            <CartItem.Price value={price} />
            <Trash2Icon
              onClick={onClickRemove}
              className="text-foreground cursor-pointer hover:text-foreground/80"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
