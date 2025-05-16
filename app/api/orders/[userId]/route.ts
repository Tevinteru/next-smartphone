import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const userId = Number((await params).userId);

  if (isNaN(userId)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
