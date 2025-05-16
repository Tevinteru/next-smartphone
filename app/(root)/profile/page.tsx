import { Container, ProfileForm } from '@/shared/components';
import { OrdersListClient } from '@/shared/components/shared/orders-list-client';
import { getUserSession } from '@/shared/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/not-auth');
  }

  // Теперь можно безопасно запросить данные с Prisma на сервере
  const user = await prisma.user.findFirst({
    where: { id: Number(session.id) },
  });

  if (!user) {
    return redirect('/not-auth');
  }

  return (
    <Container>
      <div className="mx-auto px-4 py-8 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-16">
          {/* Левый блок с профилем */}
          <div className="sticky top-4 h-fit">
            <ProfileForm data={user} />
          </div>

          {/* Правый блок с заказами */}
          <div className="flex-1 my-11">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Мои заказы</h2>
            {/* Вместо прямого вызова API используем API маршруты */}
            <OrdersListClient userId={Number(session.id)} />
          </div>
        </div>
      </div>
    </Container>
  );
}
