"use client";

import { IMaskInput } from "react-imask";

interface PhoneInputProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onErrorClear: () => void;
}

export const PhoneInput = ({
  value,
  error,
  onChange,
  onErrorClear,
}: PhoneInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Номер телефону
      </label>
      <IMaskInput
        mask="+38 (000) 000-00-00"
        value={value}
        onAccept={(value) => {
          onChange(value);
          if (error) {
            onErrorClear();
          }
        }}
        placeholder="+38 (___) ___-__-__"
        className={`flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm bg-background text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
          error ? "border-destructive" : "border-input"
        }`}
      />
      {error && (
        <p className="text-destructive text-sm mt-1">{error}</p>
      )}
    </div>
  );
};
