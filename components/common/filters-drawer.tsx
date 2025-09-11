"use client";

import { ReactNode, Suspense } from "react";
import { Filters } from "./filters";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";

type FiltersDrawerProps = {
  children: ReactNode;
};

export const FiltersDrawer = ({ children }: FiltersDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="font-bold">Фільтрація</SheetTitle>
        </SheetHeader>
        <Suspense>
          <Filters />
        </Suspense>
      </SheetContent>
    </Sheet>
  );
};
