"use client";

import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

type PaginationProps = {
  currentPage?: number;
  pageCount?: number;
};

export const Pagination = ({
  currentPage = 1,
  pageCount = 1,
}: PaginationProps) => {
  return (
    <div className="flex items-center gap-1">
      <Button
        className="p-0 w-10"
        variant="outline"
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex gap-1 mx-2">
        {[...Array(pageCount)].map((_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? "destructive" : "outline"}
          >
            {i + 1}
          </Button>
        ))}
      </div>

      <Button
        className="p-0 w-10"
        variant="outline"
        disabled={currentPage === pageCount}
      >
        <ChevronLeft className="h-4 w-4 rotate-180" />
      </Button>
    </div>
  );
};
