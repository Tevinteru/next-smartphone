"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface Filters {
  ram: Set<string>;
  storage: Set<string>;
  selectedBrands: Set<string>;
  prices: PriceProps;
  sort: string;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setRam: (value: string) => void;
  setSelectedBrands: (value: string) => void;
  setStorage: (value: string) => void;
  setSort: (value: string) => void;
  resetFilters: () => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getArrayParam = (key: string) =>
    searchParams.get(key)?.split(",").filter(Boolean) || [];

  const getNumberParam = (key: string) => {
    const value = searchParams.get(key);
    return value ? Number(value) : undefined;
  };

  const filters: Filters = {
    ram: new Set(getArrayParam("ram")),
    storage: new Set(getArrayParam("storage")),
    selectedBrands: new Set(getArrayParam("brands")),
    prices: {
      priceFrom: getNumberParam("priceFrom"),
      priceTo: getNumberParam("priceTo"),
    },
    sort: searchParams.get("sort") || "name",
  };

  const updateQuery = (newParams: Partial<Record<string, any>>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(newParams)) {
      if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else {
        if (Array.isArray(value)) {
          params.set(key, value.join(","));
        } else {
          params.set(key, String(value));
        }
      }
    }
    if (!("page" in newParams)) {
      params.set("page", "1");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const setPrices = (name: keyof PriceProps, value: number) => {
    updateQuery({ [name]: value });
  };

  const setRam = (value: string) => {
    const current = new Set(filters.ram);
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    updateQuery({ ram: Array.from(current) });
  };

  const setStorage = (value: string) => {
    const current = new Set(filters.storage);
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    updateQuery({ storage: Array.from(current) });
  };

  const setSelectedBrands = (value: string) => {
    const current = new Set(filters.selectedBrands);
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    updateQuery({ brands: Array.from(current) });
  };

  const setSort = (value: string) => {
    updateQuery({ sort: value });
  };

  const resetFilters = () => {
    router.push("?", { scroll: false });
  };

  return {
    ...filters,
    setPrices,
    setRam,
    setStorage,
    setSelectedBrands,
    setSort,
    resetFilters,
  };
};
