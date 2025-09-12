"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { cn, declOfNum } from "@/lib";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks";
import { getCartItemDetails } from "@/lib";
import { PizzaSize, PizzaType } from "@/types/pizza";
import { CartDrawerItem } from "@components/common";
import { Button } from "@/components/ui";
import { ArrowLeft, ArrowRight } from "lucide-react";

type CartDrawerProps = {
  children: ReactNode;
};

export const CartDrawer = ({ children }: CartDrawerProps) => {
  const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();
  const [redirecting, setRedirecting] = useState<boolean>(false);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-6">
        <div
          className={cn(
            "flex flex-col h-full",
            !totalAmount && "justify-center"
          )}
        >
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle className="text-left">
                У кошику
                <span className="font-bold pl-2">{totalItems}</span>
                <span className="pl-2">
                  {declOfNum(totalItems, ["товар", "товари", "товарів"])}
                </span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <Image
                src="/images/empty-box.png"
                alt="Empty cart"
                width={120}
                height={120}
              />
              <SheetTitle>Кошик пустий</SheetTitle>
              <p className="text-center text-neutral-500">
                Додайте хоча б один товар, щоб завершити замовлення
              </p>

              <SheetClose className="pt-2">
                <div className="bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/70 inline-flex items-center justify-center shadow-md gap-2 whitespace-nowrap rounded-3xl text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-8 text-md">
                  <ArrowLeft size={6} />
                  Назад
                </div>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="md:py-4 md:px-2 py-6 overflow-auto flex-1 flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.id}>
                    <CartDrawerItem
                      id={item.id}
                      imageUrl={item.imageUrl}
                      details={getCartItemDetails(
                        item.ingredients,
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize
                      )}
                      disabled={item.disabled}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      onClickCountButton={(type: "plus" | "minus") =>
                        onClickCountButton(item.id, item.quantity, type)
                      }
                      onClickRemove={() => removeCartItem(item.id)}
                    />
                  </div>
                ))}
              </div>
              <SheetFooter>
                <div className="w-full flex flex-col gap-4 py-2">
                  <div className="flex">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Усього
                    </span>
                    <span className="font-bold text-lg">{totalAmount} грн</span>
                  </div>
                  <Button
                    asChild
                    onClick={() => setRedirecting(true)}
                    loading={redirecting}
                    type="submit"
                    size="lg"
                  >
                    <Link href="/">
                      Оформити замовлення
                      <ArrowRight size={6} />
                    </Link>
                  </Button>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
