'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Smartphone, Users, Settings, LogOut, Tag, ListOrdered, Package, FileText, ScrollText } from 'lucide-react';

export const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <>
      {/* Кнопка для открытия/закрытия сайдбара (только на мобильных устройствах) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-lg md:hidden"
      >
        {isSidebarOpen ? 'Закрыть' : 'Меню'}
      </button>

      {/* Сайдбар */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out z-40`}
      >
        {/* Заголовок сайдбара */}
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Админ Панель
        </div>

        {/* Меню */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <Home className="w-5 h-5 mr-3" />
                Главная
              </Link>
            </li>
            <li>
              <Link
                href="/admin/products"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <Smartphone className="w-5 h-5 mr-3" />
                Товары
              </Link>
            </li>
            <li>
              <Link
                href="/admin/brands"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <Tag className="w-5 h-5 mr-3" />
                Бренды
              </Link>
            </li>
            <li>
              <Link
                href="/admin/orders"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <ListOrdered className="w-5 h-5 mr-3" />
                Заказы
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <Users className="w-5 h-5 mr-3" />
                Пользователи
              </Link>
            </li>
            <li>
              <Link
                href="/admin/characteristics"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <FileText className="w-5 h-5 mr-3" />
                Характеристики
              </Link>
            </li>
            <li>
              <Link
                href="/admin/logs"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <ScrollText className="w-5 h-5 mr-3" />
                Логи
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Затемнение фона на мобильных устройствах */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};