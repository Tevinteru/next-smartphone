import { create } from 'zustand';

interface Metrics {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
}

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  user: {
    fullName: string;
  };
  createdAt: string;
}

interface AdminStore {
  metrics: Metrics | null;
  latestOrders: Order[];
  loading: boolean;
  fetchMetrics: () => Promise<void>;
  fetchLatestOrders: () => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set) => ({
  metrics: null,
  latestOrders: [],
  loading: false,

  fetchMetrics: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/admin/metrics');
      const data = await response.json();
      set({ metrics: data });
    } catch (error) {
      console.error('Ошибка при загрузке метрик:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchLatestOrders: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/admin/orders/latest');
      const data = await response.json();
      set({ latestOrders: data });
    } catch (error) {
      console.error('Ошибка при загрузке заказов:', error);
    } finally {
      set({ loading: false });
    }
  },
}));