"use client";

import { Input } from "@/components/ui/input";
import { CheckoutFormData, FormErrors } from "@/types/checkout";

interface DeliveryAddressProps {
  formData: CheckoutFormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DeliveryAddress = ({
  formData,
  errors,
  onChange,
}: DeliveryAddressProps) => {
  if (formData.deliveryType !== "delivery") {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-card rounded-lg border border-border">
      <h2 className="text-lg font-bold">Адреса доставки</h2>

      <div>
        <label className="block text-sm font-medium mb-2">Адреса</label>
        <Input
          type="text"
          name="address"
          value={formData.address || ""}
          onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
  );
};
