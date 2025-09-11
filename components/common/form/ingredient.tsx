import { cn } from "@/lib";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

interface FormIngredientProps {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
}

export const FormIngredient = ({
  active,
  price,
  name,
  imageUrl,
  onClick,
}: FormIngredientProps) => {
  return (
    <div
      className={cn(
        "bg-accent rounded-lg shadow-md relative",
        "border border-input",
        active && "border-chart-2"
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-1 text-chart-2 z-50 w-7 h-7" />
      )}
      <div className="overflow-hidden h-[120px] relative rounded-t-lg">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-1 p-2">
        <span className="text-sm">{name}</span>
        <span className="font-bold">{price} грн</span>
      </div>
    </div>
  );
};
