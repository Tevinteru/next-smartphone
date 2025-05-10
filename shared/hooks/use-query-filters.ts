import React from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

export const useQueryFilters = (filters: Filters, isResetting: boolean) => {
  const isMounted = React.useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (isResetting) return;

    if (isMounted.current) {
      const params: Record<string, any> = {
        ...filters.prices,
        brands: Array.from(filters.selectedBrands),
        ram: Array.from(filters.ram),
        storage: Array.from(filters.storage),
        sort: filters.sort,
      };

      // Удаляем undefined/пустые значения
      Object.keys(params).forEach(key => {
        if (params[key] === undefined || 
            (Array.isArray(params[key]) && params[key].length === 0) ||
            params[key] === "") {
          delete params[key];
        }
      });

      const query = qs.stringify(params, {
        arrayFormat: "comma",
        skipNulls: true,
      });

      router.push(`?${query}`, { scroll: false });
    } else {
      isMounted.current = true;
    }
  }, [
    filters.selectedBrands,
    filters.ram,
    filters.storage,
    filters.prices.priceFrom,
    filters.prices.priceTo,
    filters.sort, // Добавляем sort в зависимости
    isResetting,
    searchParams
  ]);
};