"use client";

import React from "react";
import { Input } from "@/shared/components/ui/input";
import { Title } from "./title";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilters, useBrands } from "@/shared/hooks";
import { Button } from "../ui";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { brands, loading } = useBrands();
  const filters = useFilters();

  const items = brands.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  return (
    <div className={className}>
      <Title text="Фильтрация" size="md" className="mb-5 font-bold pb-4 border-b border-b-neutral-100" />

      <div>
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={300000}
            value={filters.prices.priceFrom !== undefined ? String(filters.prices.priceFrom) : ""}
            onChange={(e) => filters.setPrices("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={300000}
            placeholder="20000"
            value={filters.prices.priceTo !== undefined ? String(filters.prices.priceTo) : ""}
            onChange={(e) => filters.setPrices("priceTo", Number(e.target.value))}
          />
        </div>
      </div>

      <CheckboxFiltersGroup
        title="Бренды"
        name="brands"
        className="mt-5"
        limit={4}
        defaultItems={items.slice(0, 4)}
        items={items}
        selected={filters.selectedBrands}
        onClickCheckbox={filters.setSelectedBrands}
        loading={loading}
      />

      <CheckboxFiltersGroup
        title="Оперативная память"
        name="ram"
        className="mt-5"
        selected={filters.ram}
        onClickCheckbox={filters.setRam}
        items={[
          { text: "3 гб", value: "3" },
          { text: "4 гб", value: "4" },
          { text: "6 гб", value: "6" },
          { text: "8 гб", value: "8" },
          { text: "12 гб", value: "12" },
        ]}
      />

      <CheckboxFiltersGroup
        title="Встроенная память"
        name="storage"
        className="mt-5"
        selected={filters.storage}
        onClickCheckbox={filters.setStorage}
        items={[
          { text: "64 гб", value: "64" },
          { text: "128 гб", value: "128" },
          { text: "256 гб", value: "256" },
          { text: "512 гб", value: "512" },
          { text: "1024 гб", value: "1024" },
        ]}
      />

      <Button onClick={filters.resetFilters} className="mt-5">
        Сбросить фильтры
      </Button>
    </div>
  );
};
