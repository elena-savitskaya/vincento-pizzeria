import { cn } from "@/lib";
import React, { ReactNode } from "react";

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

export const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={cn("w-full mx-auto max-w-[1440px] p-4 lg:p-6", className)}>
      {children}
    </div>
  );
};
