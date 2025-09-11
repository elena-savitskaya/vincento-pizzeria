import React from "react";

import { cn } from "@/lib";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Title } from "./title";

export const SortPopup = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="whitespace-nowrap inline-flex items-center gap-1 rounded-2xl cursor-pointer group shadow-inner bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Title text="Сортування за:" size="xs" className="font-bold text-gray-400" />
          <ChevronDown
            className={cn(
              "w-6 h-6 transition-transform duration-200 group-data-[state=open]:rotate-180"
            )}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] whitespace-nowrap">
        <ul>
          <li className="hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md">
            зростанням
          </li>
          <li className="hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md">
            спаданням
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
