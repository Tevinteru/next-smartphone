import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

// The params is a Promise<{ id: string }> so we need to await it properly
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;  // Wait for params to resolve
  const { id } = resolvedParams;  // Now you can safely access id
  
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
