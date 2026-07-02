"use client";

import { CheckoutFormData, FormErrors } from "@/types/checkout";
import { generateTimeOptions } from "@/lib/checkout/time-options";

interface DeliveryTimeProps {
  formData: CheckoutFormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const DeliveryTime = ({
  formData,
  errors,
  onChange,
}: DeliveryTimeProps) => {
  if (formData.deliveryType !== "delivery") {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-card rounded-lg border border-border">
      <h2 className="text-lg font-bold">Час доставки</h2>

      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="deliveryTime"
            value="asap"
            checked={formData.deliveryTime === "asap"}
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
  );
};
