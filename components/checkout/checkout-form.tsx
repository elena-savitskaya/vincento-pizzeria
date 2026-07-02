"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useCheckout } from "@/hooks/use-checkout";
import { useCartStore } from "@/store";
import { CheckoutSuccess } from "./checkout-success";
import { ContactForm } from "./contact-form";
import { DeliveryType } from "./delivery-type";
import { DeliveryAddress } from "./delivery-address";
import { DeliveryTime } from "./delivery-time";
import { PaymentMethod } from "./payment-method";
import { OrderSummary } from "./order-summary";

export const CheckoutForm = () => {
  const cartItems = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const {
    formData,
    errors,
    isLoading,
    successOrderId,
    handleInputChange,
    handleSubmit,
  } = useCheckout();

  const handlePhoneChange = (value: string) => {
    const e = {
      target: { name: "phone", value },
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(e);
  };

  if (successOrderId) {
    return <CheckoutSuccess orderId={successOrderId} />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <ContactForm
        formData={formData}
        errors={errors}
        onChange={handleInputChange}
        onPhoneChange={handlePhoneChange}
        onErrorClear={() => {}}
      />

      <DeliveryType
        value={formData.deliveryType}
        onChange={handleInputChange}
      />

      <DeliveryAddress
        formData={formData}
        errors={errors}
        onChange={handleInputChange}
      />

      <DeliveryTime
        formData={formData}
        errors={errors}
        onChange={handleInputChange}
      />

      <PaymentMethod
        value={formData.paymentMethod}
        onChange={handleInputChange}
      />

      <OrderSummary cartItems={cartItems} totalAmount={totalAmount} />

      <Button
        type="submit"
        variant="destructive"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          "Підтвердити замовлення"
        )}
      </Button>
    </form>
  );
};
