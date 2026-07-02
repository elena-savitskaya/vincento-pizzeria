"use client";

import { Input } from "@/components/ui/input";
import { CheckoutFormData, FormErrors } from "@/types/checkout";
import { PhoneInput } from "./phone-input";

interface ContactFormProps {
  formData: CheckoutFormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (value: string) => void;
  onErrorClear: (field: string) => void;
}

export const ContactForm = ({
  formData,
  errors,
  onChange,
  onPhoneChange,
  onErrorClear,
}: ContactFormProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-card rounded-lg border border-border">
      <h2 className="text-lg font-bold">Контактні дані</h2>

      <div>
        <label className="block text-sm font-medium mb-2">Ім&apos;я</label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
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
          onChange={onChange}
          placeholder="your@email.com"
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-destructive text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <PhoneInput
        value={formData.phone}
        error={errors.phone}
        onChange={onPhoneChange}
        onErrorClear={() => onErrorClear("phone")}
      />
    </div>
  );
};
