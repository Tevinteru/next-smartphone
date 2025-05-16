'use client';

import { formatDate } from "@/shared/lib/utils";
import { Order } from '@/@types//order';


interface OrdersListProps {
  initialOrders: Order[];  // Теперь передаем правильный тип
}

export const OrdersList = ({ initialOrders = [] }: OrdersListProps) => {
  if (!initialOrders.length) {
    return <p className="text-gray-500">У вас пока нет заказов</p>;
  }

  return (
    <div className="space-y-4">
      {initialOrders.map(order => (
        <div key={order.id} className="border rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">Заказ #{order.id}</p>
              <p className="text-sm text-gray-500">
                {formatDate(order.createdAt)}
              </p>
              <p className="text-sm text-gray-500">
                Статус: {getStatusText(order.status)}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="">Полная стоимость:</p>
              <p className="font-semibold"> {order.totalAmount.toLocaleString()} ₽</p>
            </div>
          </div>
          
          {Array.isArray(order.items) && order.items.length > 0 && (
            <div className="mt-4 space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm pb-2">
                  <div className="flex items-center gap-4">
                    {item.product?.imageUrl && (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16"
                      />
                    )}
                    <div>
                      <p className="font-medium">{item.product?.name || `Товар #${item.productId}`}</p>
                      <p className="text-xs text-gray-500">× {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium">
                    {(item.product?.price * item.quantity).toLocaleString()} ₽
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

function getStatusText(status: string) {
  switch (status) {
    case 'PENDING': return 'В обработке';
    case 'SUCCEEDED': return 'Завершен';
    case 'CANCELLED': return 'Отменен';
    default: return status;
  }
}
