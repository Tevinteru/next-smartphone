'use client';

import Link from 'next/link';
import { useAdminStore } from '@/shared/store/admin/panel';
import { useEffect } from 'react';

export default function AdminPage() {
  const { metrics, latestOrders, loading, fetchMetrics, fetchLatestOrders } =
    useAdminStore();

  useEffect(() => {
    fetchMetrics();
    fetchLatestOrders();
  }, [fetchMetrics, fetchLatestOrders]);

  if (loading) {
    return <div className="p-6">Загрузка...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Админ Панель</h1>

      {/* Карточки с метриками */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Товары</h3>
          <p className="text-2xl font-bold text-gray-900">{metrics?.totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Заказы</h3>
          <p className="text-2xl font-bold text-gray-900">{metrics?.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Пользователи</h3>
          <p className="text-2xl font-bold text-gray-900">{metrics?.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Доход</h3>
          <p className="text-2xl font-bold text-gray-900">{metrics?.totalRevenue} ₽</p>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/admin/products/create" className="bg-blue-500 text-center font-bold uppercase text-white p-4 rounded-lg hover:bg-blue-600 transition-colors">
            Добавить товар
        </Link>
        <Link href="/admin/orders" className="bg-green-500 text-center font-bold uppercase text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
            Просмотреть заказы
        </Link>
      </div>

      {/* Последние заказы */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Последние заказы</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Пользователь</th>
              <th className="text-left">Сумма</th>
              <th className="text-left">Статус</th>
              <th className="text-left">Дата заказа</th>
            </tr>
          </thead>
          <tbody>
            {latestOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id.toString().slice(0, 6)}</td>
                <td>{order.user.fullName}</td>
                <td>{order.totalAmount} ₽</td>
                <td>{order.status}</td>
                <td>{order.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}