import { create } from 'zustand';

interface Brand {
  id: number;
  name: string;
}

interface BrandStore {
  brands: Brand[];
  fetchBrands: () => Promise<void>;
  addBrand: (name: string) => Promise<void>;
  updateBrand: (id: number, name: string) => Promise<void>;
  deleteBrand: (id: number) => Promise<void>;
}

export const useBrandStore = create<BrandStore>((set) => ({
  brands: [],
  
  fetchBrands: async () => {
    const res = await fetch('/api/admin/brands');
    const brands = await res.json();
    set({ brands });
  },

  addBrand: async (name) => {
    const res = await fetch('/api/admin/brands', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    });
    const newBrand = await res.json();
    set((state) => ({ brands: [...state.brands, newBrand] }));
  },

  updateBrand: async (id, name) => {
    await fetch('/api/admin/brands', {
      method: 'PUT',
      body: JSON.stringify({ id, name }),
      headers: { 'Content-Type': 'application/json' },
    });
    set((state) => ({
      brands: state.brands.map((b) => (b.id === id ? { ...b, name } : b)),
    }));
  },

  deleteBrand: async (id) => {
    await fetch('/api/admin/brands', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    set((state) => ({
      brands: state.brands.filter((b) => b.id !== id),
    }));
  },
}));
