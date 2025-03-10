import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

// GET: Получить все заказы
export async function GET() {
  const orders = await prisma.order.findMany({
    include: { user: true },
  });
  return NextResponse.json(orders);
}

// PUT: Обновить статус заказа
export async function PUT(request: Request) {
  const { id, status } = await request.json();
  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json(updatedOrder);
}

// DELETE: Удалить заказ
export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.order.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}