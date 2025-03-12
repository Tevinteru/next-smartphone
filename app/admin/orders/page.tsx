'use client';

import { useEffect } from 'react';
import { useOrderStore } from '@/shared/store/admin/order';
import { Button } from '@/shared/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/shared/components/ui/select'; // Импортируем компоненты Select
import { Label } from '@/shared/components/ui';
import { Title } from '@/shared/components';

type OrderType = {
  id: number;
  userId: number | null; // Исправлено на number | null
  status: 'PENDING' | 'SUCCEEDED' | 'CANCELLED';
  totalAmount: number;
};


export default function OrdersPage() {
  const { orders, fetchOrders, updateOrder, deleteOrder } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="p-6">
      <Title size='xl' text='Заказы' className="text-2xl font-bold pb-6" />
      
      <Table className="text-xl">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Пользователь</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Сумма</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
        {orders.map((order: OrderType) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.userId ?? 'Гость'}</TableCell>
              
              <TableCell>
                <Label className="block md:text-lg font-medium text-gray-700 mb-2">
                  Статус:
                  <Select
                    value={String(order.status)} // Преобразуем в строку
                    onValueChange={(value) => updateOrder(order.id, value as 'PENDING' | 'SUCCEEDED' | 'CANCELLED')}
                  >
                    <SelectTrigger className="border p-2 w-full text-lg md:text-lg">
                      <span className="md:text-lg text-lg">{order.status}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Ожидание</SelectItem>
                      <SelectItem value="SUCCEEDED">Завершен</SelectItem>
                      <SelectItem value="CANCELLED">Отменен</SelectItem>
                    </SelectContent>
                  </Select>
                </Label>
              </TableCell>

              <TableCell>{order.totalAmount} ₽</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const status = order.status ?? 'PENDING'; // Если status undefined, установим дефолтное значение
                      updateOrder(order.id, status as 'PENDING' | 'SUCCEEDED' | 'CANCELLED');
                    }}>
                    📝
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteOrder(order.id)}
                  >
                    🗑
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
