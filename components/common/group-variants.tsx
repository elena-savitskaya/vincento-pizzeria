"use client";

import { cn } from "@/lib";
import React from "react";

export type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface GroupVariantsProps {
  items: readonly Variant[];
  onClick?: (value: Variant["value"]) => void;
  value?: Variant["value"];
}

export const GroupVariants = ({
  items,
  onClick,
  value,
}: GroupVariantsProps) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex gap-1 justify-between rounded-3xl select-none">
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            "flex items-center justify-center shadow-md cursor-pointer h-[32px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm border border-input",
            {
              "bg-primary text-primary-foreground": item.value === value,
              "text-gray-500 opacity-50 pointer-events-none": item.disabled,
            }
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
