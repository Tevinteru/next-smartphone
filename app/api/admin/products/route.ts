import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      brand: true,
      smartphoneCharacteristics: {
        include: {
          category: true,  // Подключаем категории для характеристик
        },
      },
    },
  });
  return NextResponse.json(products);
}


// POST: Создать новый товар
export async function POST(request: Request) {
  const { name, description, price, imageUrl, brandId, smartphoneCharacteristics } = await request.json();
  
  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      imageUrl,
      brand: { connect: { id: brandId } },
      smartphoneCharacteristics: {
        create: smartphoneCharacteristics.map((char: { name: string; value: string; categoryId: number }) => ({
          characteristic: char.name,
          value: char.value,
          category: { connect: { id: char.categoryId } },
        })),
      },
    },
  });

  return NextResponse.json(newProduct, { status: 201 });
}


export async function PUT(request: Request) {
  const { id, brandId, imageUrl, characteristics, ...updateData } = await request.json();
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      ...updateData,
      imageUrl, // Добавляем обновление фото
      brand: brandId ? { connect: { id: brandId } } : undefined,
      smartphoneCharacteristics: {
        upsert: characteristics?.map((char: { id: any; name: any; value: any; categoryId: any; }) => ({
          where: { id: char.id ?? 0 },
          update: {
            characteristic: char.name,
            value: char.value,
            category: { connect: { id: char.categoryId } },
          },
          create: {
            characteristic: char.name,
            value: char.value,
            category: { connect: { id: char.categoryId } },
          },
        })),
      },
    },
    include: { smartphoneCharacteristics: true },
  });

  return NextResponse.json(updatedProduct);
}

// DELETE: Удалить товар
export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.product.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}