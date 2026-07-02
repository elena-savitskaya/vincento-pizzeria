"use client";

import { useState } from "react";
import { CheckoutFormData, FormErrors } from "@/types/checkout";
import { validateForm } from "@/lib/checkout/validation";
import { cleanPhoneNumber } from "@/lib/checkout/phone";
import { processGooglePay } from "@/lib/checkout/google-pay";
import { useCartStore } from "@/store";
import { toastError, toastSuccess } from "@/lib";

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);
  const cartItems = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const clearCart = useCartStore((state) => state.clearCart);

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    phone: "",
    deliveryType: "delivery",
    deliveryTime: "asap",
    paymentMethod: "google-pay",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let newData: CheckoutFormData = {
      ...formData,
      [name]: value,
    };

    if (name === "deliveryType" && value === "pickup") {
      newData = {
        ...newData,
        address: "",
        city: "",
        postalCode: "",
        deliveryTime: "asap",
        deliveryHour: "",
      };
    }

    setFormData(newData);
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toastError("Додайте товари до кошика перед оформленням замовлення");
      return;
    }

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      toastError("Заповніть усі обов'язкові поля");
      return;
    }

    setIsLoading(true);
    try {
      let paymentToken = null;

      if (formData.paymentMethod === "google-pay") {
        paymentToken = await processGooglePay(totalAmount, cartItems);
        if (!paymentToken) {
          setIsLoading(false);
          return;
        }
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: cleanPhoneNumber(formData.phone),
          items: cartItems,
          totalAmount,
          paymentToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Помилка при оформленні замовлення"
        );
      }

      const data = await response.json();

      await fetch("/api/cart", { method: "DELETE" }).catch(() => {});

      clearCart();
      setFormData({
        name: "",
        email: "",
        phone: "",
        deliveryType: "delivery",
        address: "",
        city: "",
        postalCode: "",
        deliveryTime: "asap",
        deliveryHour: "",
        paymentMethod: "google-pay",
      });
      setErrors({});
      setSuccessOrderId(data.orderId);
      toastSuccess("Замовлення успішно оформлено!");
    } catch (error) {
      console.error(error);
      toastError(
        error instanceof Error
          ? error.message
          : "Не вдалося оформити замовлення"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isLoading,
    successOrderId,
    handleInputChange,
    handleSubmit,
  };
};
