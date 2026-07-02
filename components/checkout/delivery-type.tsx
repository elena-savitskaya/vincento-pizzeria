"use client";

interface DeliveryTypeProps {
  value: "delivery" | "pickup";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DeliveryType = ({ value, onChange }: DeliveryTypeProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-card rounded-lg border border-border">
      <h2 className="text-lg font-bold">Тип доставки</h2>

      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="deliveryType"
            value="delivery"
            checked={value === "delivery"}
            onChange={onChange}
            className="w-4 h-4"
          />
          <span className="font-medium">Доставка</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="deliveryType"
            value="pickup"
            checked={value === "pickup"}
            onChange={onChange}
            className="w-4 h-4"
          />
          <span className="font-medium">Самовивіз</span>
        </label>
      </div>
    </div>
  );
};
