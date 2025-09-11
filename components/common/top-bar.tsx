"use client";

import { CartDrawer, Categories, Container } from "@/components/common";
import { useCart } from "@/hooks";
import { Category } from "@/prisma/generated/prisma";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui";

type TopBarProps = {
  categories: Category[];
};

export const TopBar = ({ categories }: TopBarProps) => {
  const { totalAmount, items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="sticky top-0 z-30 w-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-input">
      <Container>
        <div className="w-full flex md:flex-row flex-col-reverse md:items-center justify-between gap-2">
          <Categories items={categories} />
          <CartDrawer>
            <Button className="group relative" variant="destructive">
              <b className="leading-4">{totalAmount} грн</b>
              <span className="h-full w-[1px] bg-white/30 mx-2" />
              <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart size={16} className="relative" strokeWidth={2} />
                <b className="leading-4">{totalItems}</b>
              </div>
              <ArrowRight
                size={20}
                className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </Button>
          </CartDrawer>
        </div>
      </Container>
    </div>
  );
};
