import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET() {
  try {
    const totalProducts = await prisma.product.count();
    const totalOrders = await prisma.order.count();
    const totalUsers = await prisma.user.count();
    const totalRevenue = await prisma.order.aggregate({
      _sum: {
        totalAmount: true, // Используйте правильное имя поля
      },
    });

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue._sum.totalAmount || 0, // Используйте правильное имя поля
    });
  } catch {
    return NextResponse.json(
      { error: 'Ошибка при загрузке данных' },
      { status: 500 }
    );
  }
}