import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';

export default function AdminPage() {
  return (
    <div className="p-12">
      <h1 className="text-5xl font-semibold text-center text-gray-900 mb-16">Админ-панель</h1>
      <div className="flex flex-col items-center gap-8">
        <Link href="/admin/products">
          <Button className="text-xl py-6 px-12 w-64">Товары</Button>
        </Link>

        <Link href="/admin/brands">
          <Button className="text-xl py-6 px-12 w-64">Бренды</Button>
        </Link>

        <Link href="/admin/orders">
          <Button className="text-xl py-6 px-12 w-64">Заказы</Button>
        </Link>

        <Link href="/admin/users">
          <Button className="text-xl py-6 px-12 w-64">Пользователи</Button>
        </Link>

        <Link href="/admin/characteristics">
          <Button className="text-xl py-6 px-12 w-64">Характеристики</Button>
        </Link>
      </div>
    </div>
  );
}
