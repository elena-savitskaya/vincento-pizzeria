import { Metadata } from "next";
import { Container, Title } from "@/components/common";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Vincento Pizza | Оформлення замовлення",
  description: "Оформіть своє замовлення піци у Vincento Pizza",
};

export default function CheckoutPage() {
  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <Title
          text="Оформлення замовлення"
          size="sm"
          className="font-extrabold pb-6"
        />
        <CheckoutForm />
      </div>
    </Container>
  );
}
