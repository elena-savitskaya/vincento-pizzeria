import React from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { CartDrawer } from "@/components/common";
import { Button } from "@/components/ui/button";

export const CartButton = () => {
  return (
    <CartDrawer>
      <Button className="group relative" variant="destructive">
        <b className="leading-4">0 грн</b>
        <span className="h-full w-[1px] bg-white/30 mx-2" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b className="leading-4">0</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};
