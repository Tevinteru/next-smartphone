// /app/api/admin/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  // Пытаемся получить товар по ID
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      brand: true,
      smartphoneCharacteristics: {
        include: {
          category: true,
        }
      },
    }
  });

  // Если продукт не найден, возвращаем ошибку 404
  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}
