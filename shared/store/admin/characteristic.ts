import { create } from 'zustand';

interface Characteristic {
  id: number;
  characteristic: string;
  value: string;
  categoryId: number;
}

interface CharacteristicCategory {
  id: number;
  name: string;
}

interface CharacteristicStore {
  characteristics: Characteristic[];
  categories: CharacteristicCategory[];
  fetchCharacteristics: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  addCharacteristic: (data: Omit<Characteristic, 'id'>) => Promise<void>;
  updateCharacteristic: (id: number, data: Partial<Characteristic>) => Promise<void>;
  deleteCharacteristic: (id: number) => Promise<void>;
}

export const useCharacteristicStore = create<CharacteristicStore>((set) => ({
  characteristics: [],
  categories: [],

  fetchCharacteristics: async () => {
    const res = await fetch('/api/admin/characteristics');
    const data = await res.json();
    set({ characteristics: data });
  },

  fetchCategories: async () => {
    const res = await fetch('/api/admin/categories');
    const data = await res.json();
    set({ categories: data });
  },

  addCharacteristic: async (data) => {
    const res = await fetch('/api/admin/characteristics', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    const newChar = await res.json();
    set((state) => ({ characteristics: [...state.characteristics, newChar] }));
  },

  updateCharacteristic: async (id, data) => {
    await fetch('/api/admin/characteristics', {
      method: 'PUT',
      body: JSON.stringify({ id, ...data }),
      headers: { 'Content-Type': 'application/json' },
    });
    set((state) => ({
      characteristics: state.characteristics.map((c) =>
        c.id === id ? { ...c, ...data } : c
      ),
    }));
  },

  deleteCharacteristic: async (id) => {
    await fetch('/api/admin/characteristics', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    set((state) => ({
      characteristics: state.characteristics.filter((c) => c.id !== id),
    }));
  },
}));
