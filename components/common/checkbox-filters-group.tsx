"use client";

import React, { useState } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input, Skeleton } from "@/components/ui";

type Item = FilterChecboxProps;

interface CheckboxFiltersGroupProps {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selectedValue?: Set<string>;
  name?: string;
}

export const CheckboxFiltersGroup = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Пошук...",
  loading,
  onClickCheckbox,
  selectedValue,
  name,
}: CheckboxFiltersGroupProps) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <p className="font-bold">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 rounded-[8px]" />
          ))}

        <Skeleton className="w-full h-6 rounded-[8px]" />
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  return (
    <div className="flex flex-col gap-3 border-b border-input py-4">
      <p className="font-bold">{title}</p>
      {showAll && (
        <Input
          onChange={onChangeSearchInput}
          placeholder={searchInputPlaceholder}
        />
      )}
      <div
        className={`flex flex-col gap-4 w-full overflow-auto scrollbar ${
          showAll ? "max-h-none" : "max-h-96"
        }`}
      >
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selectedValue?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>
      {items.length > limit && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-destructive w-full h-6 text-left"
        >
          {showAll ? "Сховати" : "+ Показати всі"}
        </button>
      )}
    </div>
  );
};
