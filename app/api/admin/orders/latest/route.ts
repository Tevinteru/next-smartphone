import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET() {
  try {
    const latestOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(latestOrders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при загрузке данных' },
      { status: 500 }
    );
  }
}