import React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type CountButtonProps = {
  value?: number;
  onClick?: (type: "plus" | "minus") => void;
};

export const CountButton = ({ value = 1, onClick }: CountButtonProps) => {
  return (
    <div className="rounded-2xl inline-flex items-center justify-between gap-3 bg-secondary text-secondary-foreground shadow-sm">
      <Button
        size="icon"
        variant="outline"
        onClick={() => onClick?.("minus")}
        disabled={value === 1}
      >
        <Minus className="h-4" />
      </Button>
      <b className="text-sm">{value}</b>
      <Button
        size="icon"
        variant="outline"
        onClick={() => onClick?.("plus")}
      >
        <Plus className="h-4" />
      </Button>
    </div>
  );
};
