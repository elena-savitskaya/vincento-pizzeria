"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface CheckoutSuccessProps {
  orderId: string;
}

export const CheckoutSuccess = ({ orderId }: CheckoutSuccessProps) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className="relative">
        <CheckCircle className="w-24 h-24 text-green-500" strokeWidth={1.5} />
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-extrabold mb-2">Замовлення прийнято!</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Спасибо за ваше замовлення. Ми почнемо готувати вашу піцу негайно.
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 w-full text-center">
        <p className="text-sm text-muted-foreground mb-2">Номер замовлення</p>
        <p className="text-2xl md:text-3xl font-extrabold text-destructive break-words">{orderId}</p>
      </div>

      <div className="text-center text-muted-foreground">
        <p className="mb-2">Час приготування: близько 30-40 хвилин</p>
        <p>Ми надішлемо вам СМС з оновленням статусу замовлення</p>
      </div>

      <div>
        <Link href="/">
          <Button variant="outline" size="lg">
            На головну
          </Button>
        </Link>
      </div>
    </div>
  );
};
