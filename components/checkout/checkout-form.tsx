"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store";
import { toastError, toastSuccess } from "@/lib";
import { Loader } from "lucide-react";
import { CheckoutSuccess } from "./checkout-success";

declare global {
  interface Window {
    PaymentRequest?: typeof PaymentRequest;
  }
}

interface PaymentMethodData {
  supportedMethods: string;
  data: {
    environment: string;
    apiVersion: number;
    apiVersionMinor: number;
    allowedCardNetworks: string[];
    allowedAuthMethods: string[];
    merchantInfo: {
      merchantId?: string;
      merchantName: string;
    };
  };
}

interface PaymentDetails {
  total: {
    label: string;
    amount: {
      currency: string;
      value: string;
    };
  };
  displayItems: Array<{
    label: string;
    amount: {
      currency: string;
      value: string;
    };
  }>;
}

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  deliveryType: "delivery" | "pickup";
  address?: string;
  city?: string;
  postalCode?: string;
  deliveryTime: "asap" | "scheduled";
  deliveryHour?: string;
  paymentMethod: "google-pay" | "card";
}

interface FormErrors {
  [key: string]: string;
}

export const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);
  const cartItems = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const clearCart = useCartStore((state) => state.clearCart);

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    phone: "+38",
    deliveryType: "delivery",
    deliveryTime: "asap",
    paymentMethod: "google-pay",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ім'я обов'язкове";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обов'язковий";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Номер телефону обов'язковий";
    } else if (!/^\+38\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(formData.phone)) {
      newErrors.phone = "Невірний формат номера телефону";
    }

    if (formData.deliveryType === "delivery") {
      if (!formData.address?.trim()) {
        newErrors.address = "Адреса обов'язкова";
      }
      if (!formData.city?.trim()) {
        newErrors.city = "Місто обов'язкове";
      }
      if (!formData.postalCode?.trim()) {
        newErrors.postalCode = "Поштовий індекс обов'язковий";
      }

      if (formData.deliveryTime === "scheduled" && !formData.deliveryHour) {
        newErrors.deliveryHour = "Виберіть час доставки";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (phone: string): string => {
    const digits = phone.replace(/\D/g, "");

    if (!digits) return "+38";
    if (digits.length === 1) return `+38(0${digits}`;
    if (digits.length === 2) return `+38(0${digits}`;
    if (digits.length === 3) return `+38(${digits})`;
    if (digits.length === 4) return `+38(${digits.slice(0, 3)})-${digits.slice(3)}`;
    if (digits.length === 5) return `+38(${digits.slice(0, 3)})-${digits.slice(3)}`;
    if (digits.length === 6) return `+38(${digits.slice(0, 3)})-${digits.slice(3)}`;
    if (digits.length === 7) return `+38(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6)}`;
    if (digits.length === 8) return `+38(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6)}`;
    if (digits.length === 9) return `+38(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8)}`;
    if (digits.length >= 10) return `+38(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`;

    return phone;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let phoneValue = value;
    if (name === "phone") {
      phoneValue = formatPhoneNumber(value);
    }

    let newData: CheckoutFormData = {
      ...formData,
      [name]: name === "phone" ? phoneValue : value,
    };

    // Очищення полів адреси при переключенні на самовивіз
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

  const processGooglePay = async (): Promise<string | null> => {
    if (!window.PaymentRequest) {
      toastError("Google Pay не підтримується вашим браузером");
      return null;
    }

    const paymentMethods: PaymentMethodData[] = [
      {
        supportedMethods: "https://google.com/pay",
        data: {
          environment: "PRODUCTION",
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedCardNetworks: ["VISA", "MASTERCARD"],
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          merchantInfo: {
            merchantId: process.env.NEXT_PUBLIC_GOOGLE_MERCHANT_ID,
            merchantName: "Vincento Pizza",
          },
        },
      },
    ];

    const paymentDetails: PaymentDetails = {
      total: {
        label: "Загальна сума",
        amount: {
          currency: "UAH",
          value: totalAmount.toString(),
        },
      },
      displayItems: cartItems.map((item) => ({
        label: item.name,
        amount: {
          currency: "UAH",
          value: (item.price * item.quantity).toString(),
        },
      })),
    };

    try {
      const paymentRequest = new (window.PaymentRequest as typeof PaymentRequest)(
        paymentMethods as unknown as PaymentMethodData[],
        paymentDetails as unknown as PaymentDetails
      );

      const paymentResponse = await paymentRequest.show();
      await paymentResponse.complete("success");

      return JSON.stringify({
        method: paymentResponse.methodName,
        details: paymentResponse.details,
      });
    } catch (error) {
      console.error("Google Pay error:", error);
      toastError("Помилка при обробці платежу");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toastError("Додайте товари до кошика перед оформленням замовлення");
      return;
    }

    if (!validateForm()) {
      toastError("Заповніть усі обов'язкові поля");
      return;
    }

    setIsLoading(true);
    try {
      let paymentToken = null;

      if (formData.paymentMethod === "google-pay") {
        paymentToken = await processGooglePay();
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
          items: cartItems,
          totalAmount,
          paymentToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Помилка при оформленні замовлення");
      }

      const data = await response.json();
      clearCart();
      setSuccessOrderId(data.orderId);
      toastSuccess("Замовлення успішно оформлено!");
    } catch (error) {
      console.error(error);
      toastError(
        error instanceof Error ? error.message : "Не вдалося оформити замовлення"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (successOrderId) {
    return <CheckoutSuccess orderId={successOrderId} />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Контактні дані */}
      <div className="flex flex-col gap-4 p-4 bg-card rounded-lg border border-border">
        <h2 className="text-lg font-bold">Контактні дані</h2>

        <div>
          <label className="block text-sm font-medium mb-2">Ім&apos;я</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ваше ім'я"
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-destructive text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your@email.com"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Номер телефону</label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+38 (0XX) XXX XX XX"
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-destructive text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Тип доставки */}
      <div className="flex flex-col gap-4 p-4 bg-card rounded-lg border border-border">
        <h2 className="text-lg font-bold">Тип доставки</h2>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="deliveryType"
              value="delivery"
              checked={formData.deliveryType === "delivery"}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <span className="font-medium">Доставка</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="deliveryType"
              value="pickup"
              checked={formData.deliveryType === "pickup"}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <span className="font-medium">Самовивіз</span>
          </label>
        </div>
      </div>

      {/* Адреса доставки */}
      {formData.deliveryType === "delivery" && (
        <div className="flex flex-col gap-4 p-4 bg-card rounded-lg border border-border">
          <h2 className="text-lg font-bold">Адреса доставки</h2>

          <div>
            <label className="block text-sm font-medium mb-2">Адреса</label>
            <Input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
              placeholder="вул. Назва, дім, кв."
              className={errors.address ? "border-destructive" : ""}
            />
            {errors.address && (
              <p className="text-destructive text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Місто</label>
              <Input
                type="text"
                name="city"
                value={formData.city || ""}
                onChange={handleInputChange}
                placeholder="Київ"
                className={errors.city ? "border-destructive" : ""}
              />
              {errors.city && (
                <p className="text-destructive text-sm mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Поштовий індекс
              </label>
              <Input
                type="text"
                name="postalCode"
                value={formData.postalCode || ""}
                onChange={handleInputChange}
                placeholder="02000"
                className={errors.postalCode ? "border-destructive" : ""}
              />
              {errors.postalCode && (
                <p className="text-destructive text-sm mt-1">
                  {errors.postalCode}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Час доставки */}
      {formData.deliveryType === "delivery" && (
        <div className="flex flex-col gap-4 p-4 bg-card rounded-lg border border-border">
          <h2 className="text-lg font-bold">Час доставки</h2>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="deliveryTime"
                value="asap"
                checked={formData.deliveryTime === "asap"}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="font-medium">Якомога швидше</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="deliveryTime"
                value="scheduled"
                checked={formData.deliveryTime === "scheduled"}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="font-medium">На конкретну годину</span>
            </label>
          </div>

          {formData.deliveryTime === "scheduled" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Виберіть час
              </label>
              <select
                name="deliveryHour"
                value={formData.deliveryHour || ""}
                onChange={handleInputChange}
                className={`flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm bg-background text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                  errors.deliveryHour ? "border-destructive" : "border-input"
                }`}
              >
                <option value="">-- Виберіть час --</option>
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.deliveryHour && (
                <p className="text-destructive text-sm mt-1">
                  {errors.deliveryHour}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Спосіб оплати */}
      <div className="flex flex-col gap-4 p-4 bg-card rounded-lg border border-border">
        <h2 className="text-lg font-bold">Спосіб оплати</h2>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="google-pay"
              checked={formData.paymentMethod === "google-pay"}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <span className="font-medium">Google Pay</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === "card"}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <span className="font-medium">Карта</span>
          </label>
        </div>
      </div>

      {/* Підсумок замовлення */}
      <div className="flex flex-col gap-3 p-4 bg-card rounded-lg border border-border">
        <h2 className="text-lg font-bold">Підсумок</h2>
        <div className="flex justify-between items-center text-lg">
          <span>Кількість товарів:</span>
          <span className="font-bold">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </div>
        <div className="flex justify-between items-center text-xl border-t border-border pt-3">
          <span className="font-bold">Всього:</span>
          <span className="font-extrabold text-destructive">{totalAmount} грн</span>
        </div>
      </div>

      {/* Кнопка відправки */}
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

function generateTimeOptions(): string[] {
  const options = [];
  for (let hour = 10; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      options.push(
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
      );
    }
  }
  return options;
}
