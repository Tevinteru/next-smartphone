import { useRouter, useSearchParams } from "next/navigation";
import { useFiltersStore } from "@/shared/store/filters";
import { useEffect } from "react";

export const useFilters = () => {
  const {
    ram,
    storage,
    selectedBrands,
    prices,
    setPrices,
    setRam,
    setStorage,
    setSelectedBrands,
    resetFilters,
  } = useFiltersStore();

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (prices.priceFrom !== undefined) newSearchParams.set("priceFrom", String(prices.priceFrom));
    else newSearchParams.delete("priceFrom");

    if (prices.priceTo !== undefined) newSearchParams.set("priceTo", String(prices.priceTo));
    else newSearchParams.delete("priceTo");

    if (selectedBrands.size) newSearchParams.set("brands", Array.from(selectedBrands).join(","));
    else newSearchParams.delete("brands");

    if (ram.size) newSearchParams.set("ram", Array.from(ram).join(","));
    else newSearchParams.delete("ram");

    if (storage.size) newSearchParams.set("storage", Array.from(storage).join(","));
    else newSearchParams.delete("storage");

    router.replace(`?${newSearchParams.toString()}`);
  }, [prices, selectedBrands, ram, storage, router]);

  return {
    ram,
    storage,
    selectedBrands,
    prices,
    setPrices,
    setRam,
    setSelectedBrands,
    setStorage,
    resetFilters,
  };
};
