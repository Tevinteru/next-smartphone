// /app/api/admin/users/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

// GET: Получить всех пользователей
export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      orders: true, // Если нужно вернуть информацию о заказах
    },
  });

  return NextResponse.json(users);
}

// POST: Создать нового пользователя
export async function POST(request: Request) {
  const { fullName, email, password, role } = await request.json();

  // Важно: добавь хеширование пароля перед сохранением в БД

  const newUser = await prisma.user.create({
    data: {
      fullName,
      email,
      password, // Хешированный пароль
      role,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
