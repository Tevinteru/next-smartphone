import { useRouter, useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  ram: string;
  brands: string;
  storage: string;
}

export interface Filters {
  ram: Set<string>;
  storage: Set<string>;
  selectedBrands: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setRam: (value: string) => void;
  setSelectedBrands: (value: string) => void;
  setStorage: (value: string) => void;
  resetFilters: () => void; // Добавляем функцию сброса
}

export const useFilters = (): ReturnProps => {
  const router = useRouter();
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  /* Фильтр брендов*/
  const [selectedBrands, { toggle: toggleBrands, reset: resetBrands }] = useSet(
    new Set<string>(searchParams.get("brands")?.split(","))
  );

  /* Фильтр ОЗУ*/
  const [ram, { toggle: toggleRam, reset: resetRam }] = useSet(
    new Set<string>(
      searchParams.get("ram") ? searchParams.get("ram")?.split(",") : []
    )
  );

  /* Фильтр встроенной памяти*/
  const [storage, { toggle: toggleStorage, reset: resetStorage }] = useSet(
    new Set<string>(
      searchParams.get("storage") ? searchParams.get("storage")?.split(",") : []
    )
  );

  /* Фильтр стоимости*/
  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices({
      ...prices,
      [name]: value,
    });
  };

  // Функция сброса фильтров
  const resetFilters = () => {
    // Сбрасываем состояния
    resetBrands();
    resetRam();
    resetStorage();
    setPrices({ priceFrom: undefined, priceTo: undefined });

    // Очищаем параметры URL
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("brands");
    newSearchParams.delete("ram");
    newSearchParams.delete("storage");
    newSearchParams.delete("priceFrom");
    newSearchParams.delete("priceTo");

    // Обновляем URL без параметров фильтрации
    router.replace(`?${newSearchParams.toString()}`);
  };

  return React.useMemo(
    () => ({
      storage,
      ram,
      selectedBrands,
      prices,
      setPrices: updatePrice,
      setStorage: toggleStorage,
      setRam: toggleRam,
      setSelectedBrands: toggleBrands,
      resetFilters, // Возвращаем функцию сброса
    }),
    [storage, ram, selectedBrands, prices]
  );
};