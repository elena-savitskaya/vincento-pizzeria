"use client";

import { CheckboxFiltersGroup, Title } from "@/components/common";
import { Button, Input, RangeSlider } from "@/components/ui";
import { useFilters, useQueryFilters } from "@/hooks";
import { useAllIngredients } from "@/hooks/use-all-ingredients";

export const Filters = () => {
  const { allIingredients, loading } = useAllIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  const items = allIingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div className="flex flex-col gap-4">
      <Title
        text="Фільтрація"
        size="sm"
        className="font-bold lg:block hidden"
      />
      <div className="flex flex-col gap-3">
        <CheckboxFiltersGroup
          title="Новинки"
          name="isNew"
          onClickCheckbox={filters.setIsNew}
          selectedValue={filters.isNew}
          items={[{ text: "Тільки новинки", value: "true" }]}
        />
        <CheckboxFiltersGroup
          title="Тісто"
          name="pizzaTypes"
          onClickCheckbox={filters.setPizzaTypes}
          selectedValue={filters.pizzaTypes}
          items={[
            { text: "Тонке", value: "1" },
            { text: "Пухке", value: "2" },
          ]}
        />
        <CheckboxFiltersGroup
          title="Розмір"
          name="sizes"
          onClickCheckbox={filters.setSizes}
          selectedValue={filters.sizes}
          items={[
            { text: "30 см", value: "30" },
            { text: "35 см", value: "35" },
            { text: "40 см", value: "40" },
          ]}
        />
      </div>
      <div className="flex flex-col gap-3 border-b border-input py-4">
        <p className="font-bold">Ціна від / до:</p>
        <Input
          type="number"
          placeholder="0"
          min={0}
          max={1000}
          value={String(filters.prices.priceFrom)}
          onChange={(e) =>
            filters.setPrices("priceFrom", Number(e.target.value))
          }
        />
        <Input
          type="number"
          min={0}
          max={1000}
          placeholder="1000"
          value={String(filters.prices.priceTo)}
          onChange={(e) => filters.setPrices("priceTo", Number(e.target.value))}
        />
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            Math.min(filters.prices.priceFrom || 0, 1000),
            Math.min(filters.prices.priceTo || 1000, 1000),
          ]}
          onValueChange={updatePrices}
        />
      </div>
      <CheckboxFiltersGroup
        title="інгредієнти"
        name="ingredients"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selectedValue={filters.selectedIngredients}
      />
      <Button variant="destructive" onClick={filters.resetFilters}>
        Очистити фильтри
      </Button>
    </div>
  );
};
