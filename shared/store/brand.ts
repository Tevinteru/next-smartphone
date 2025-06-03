import { create } from "zustand";
import { Brand } from "@prisma/client";
import { Api } from "@/shared/services/api-client";

type BrandStore = {
  brands: Brand[];
  loading: boolean;
  fetchBrands: () => Promise<void>;
  fetched: boolean;
};

export const useBrandStore = create<BrandStore>((set, get) => ({
  brands: [],
  loading: false,
  fetched: false,
  fetchBrands: async () => {
    if (get().fetched) return;
    set({ loading: true });
    try {
      const brands = await Api.brands.getAll();
      set({ brands, fetched: true });
    } catch (err) {
      console.error("Ошибка при получении брендов", err);
    } finally {
      set({ loading: false });
    }
  },
}));
