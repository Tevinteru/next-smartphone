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
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  /* Фильтр брендов*/
  const [selectedBrands, { toggle: toggleBrands }] = useSet(
    new Set<string>(searchParams.get("brands")?.split(","))
  );

  /* Фильтр ОЗУ*/
  const [ram, { toggle: toggleRam }] = useSet(
    new Set<string>(
      searchParams.get("ram") ? searchParams.get("ram")?.split(",") : []
    )
  );

  /* Фильтр ОЗУ*/
  const [storage, { toggle: toggleStorage }] = useSet(
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
    }),
    [storage, ram, selectedBrands, prices]
  );
};
