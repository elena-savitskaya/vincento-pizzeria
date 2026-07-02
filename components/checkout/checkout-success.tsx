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
        <CheckCircle className="w-20 h-20 text-green-500" strokeWidth={1.5} />
      </div>

      <h3 className="text-3xl font-extrabold text-center">
        Замовлення прийнято!
      </h3>

      <div className="bg-card border border-border rounded-lg p-6 w-full text-center">
        <p className="text-sm text-muted-foreground">Номер замовлення</p>
        <p className="text-xl md:text-2xl font-extrabold text-destructive break-words">
          {orderId}
        </p>
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
