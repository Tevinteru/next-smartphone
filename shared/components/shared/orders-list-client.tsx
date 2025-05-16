'use client';

import { useOrders } from '@/shared/hooks/use-orders';  // Путь к твоему хуку
import { OrdersList } from '@/shared/components/';  // Компонент для отображения заказов
import { Order } from '@/@types//order';

interface OrdersListClientProps {
  userId: number;  // Получаем userId как пропс
}

export const OrdersListClient = ({ userId }: OrdersListClientProps) => {
  const { orders, loading, error } = useOrders(userId);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  const parsedOrders = orders.map(order => {
    const parsedItems = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;

      return {
      ...order,
      items: parsedItems,
    } as unknown as Order;
  });


  console.log(parsedOrders)
  return <OrdersList initialOrders={parsedOrders} />;
};
