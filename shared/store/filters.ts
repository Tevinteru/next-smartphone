import { create } from "zustand";
import { useRouter, useSearchParams } from "next/navigation";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface FiltersState {
  ram: Set<string>;
  storage: Set<string>;
  selectedBrands: Set<string>;
  prices: PriceProps;
  
  setPrices: (name: keyof PriceProps, value: number) => void;
  setRam: (value: string) => void;
  setSelectedBrands: (value: string) => void;
  setStorage: (value: string) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  ram: new Set(),
  storage: new Set(),
  selectedBrands: new Set(),
  prices: { priceFrom: undefined, priceTo: undefined },

  setPrices: (name, value) => set((state) => ({
    prices: { ...state.prices, [name]: value },
  })),

  setRam: (value) => set((state) => {
    const updatedSet = new Set(state.ram);
    updatedSet.has(value) ? updatedSet.delete(value) : updatedSet.add(value);
    return { ram: updatedSet };
  }),

  setSelectedBrands: (value) => set((state) => {
    const updatedSet = new Set(state.selectedBrands);
    updatedSet.has(value) ? updatedSet.delete(value) : updatedSet.add(value);
    return { selectedBrands: updatedSet };
  }),

  setStorage: (value) => set((state) => {
    const updatedSet = new Set(state.storage);
    updatedSet.has(value) ? updatedSet.delete(value) : updatedSet.add(value);
    return { storage: updatedSet };
  }),

  resetFilters: () => set({
    ram: new Set(),
    storage: new Set(),
    selectedBrands: new Set(),
    prices: { priceFrom: undefined, priceTo: undefined },
  }),
}));
