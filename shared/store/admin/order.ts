import { create } from 'zustand';

interface Order {
  id: number;
  userId: number | null;
  token: string;
  items: any;
  status: 'PENDING' | 'SUCCEEDED' | 'CANCELLED';
  totalAmount: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  comment?: string;
}

interface OrderStore {
  orders: Order[];
  fetchOrders: () => Promise<void>;
  updateOrder: (id: number, status: Order['status']) => Promise<void>;
  deleteOrder: (id: number) => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],

  fetchOrders: async () => {
    const res = await fetch('/api/admin/orders');
    const data = await res.json();
    set({ orders: data });
  },

  updateOrder: async (id, status) => {
    await fetch('/api/admin/orders', {
      method: 'PUT',
      body: JSON.stringify({ id, status }),
      headers: { 'Content-Type': 'application/json' },
    });
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, status } : order
      ),
    }));
  },

  deleteOrder: async (id) => {
    await fetch('/api/admin/orders', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    }));
  },
}));
