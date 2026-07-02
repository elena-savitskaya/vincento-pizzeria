"use client";

interface PaymentMethodProps {
  value: "google-pay" | "card";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PaymentMethod = ({ value, onChange }: PaymentMethodProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-card rounded-lg border border-border">
      <h2 className="text-lg font-bold">Спосіб оплати</h2>

      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="google-pay"
            checked={value === "google-pay"}
            onChange={onChange}
            className="w-4 h-4"
          />
          <span className="font-medium">Google Pay</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={value === "card"}
            onChange={onChange}
            className="w-4 h-4"
          />
          <span className="font-medium">Карта</span>
        </label>
      </div>
    </div>
  );
};
