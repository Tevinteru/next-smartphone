import { useEffect, useState } from 'react';

interface Order {
  id: number;
  status: string;
  totalAmount: number;
  createdAt: Date;
  items: string; // или any, если строка JSON
}

export function useOrders(userId: number) {
  const [orders, setOrders] = useState<Order[]>([]); // ← тут массив
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders/${userId}`);
        if (!res.ok) throw new Error('Ошибка при загрузке заказов');

        const data = await res.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return { orders, loading, error };
}
