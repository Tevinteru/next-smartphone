import { create } from 'zustand';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brandId: number;
}

interface ProductStore {
  products: Product[];
  fetchProducts: () => Promise<void>;
  createProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  fetchProducts: async () => {
    const res = await fetch('/api/admin/products');
    const data = await res.json();
    set({ products: data });
  },

  createProduct: async (product) => {
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' },
    });
    const newProduct = await res.json();
    set((state) => ({ products: [...state.products, newProduct] }));
  },

  updateProduct: async (id, data) => {
    const res = await fetch('/api/admin/products', {
      method: 'PUT',
      body: JSON.stringify({ id, ...data }),
      headers: { 'Content-Type': 'application/json' },
    });
    const updatedProduct = await res.json();
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? updatedProduct : p)),
    }));
  },

  deleteProduct: async (id) => {
    await fetch('/api/admin/products', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },
}));
