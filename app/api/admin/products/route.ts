import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

// Типы данных для характеристик
interface Characteristic {
  id?: number;
  name: string;
  value: string;
  categoryId: number;
}

// Тип данных для обновления товара
interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  brandId?: number | null;
  smartphoneCharacteristics?: Characteristic[];
}

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
  const { name, description, price, imageUrl, brandId, smartphoneCharacteristics }: { 
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    brandId: number;
    smartphoneCharacteristics: Characteristic[];
  } = await request.json();
  
  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      imageUrl,
      brand: { connect: { id: brandId } },
      smartphoneCharacteristics: {
        create: smartphoneCharacteristics.map((char) => ({
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
  const { id, brandId, imageUrl, characteristics, ...updateData }: { 
    id: number;
    brandId: number | null;
    imageUrl: string;
    characteristics: Characteristic[];
  } & UpdateProductData = await request.json();  // Type casting for specific fields

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      ...updateData,
      imageUrl, // Добавляем обновление фото
      brand: brandId ? { connect: { id: brandId } } : undefined,
      smartphoneCharacteristics: {
        upsert: characteristics?.map((char) => ({
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
  const { id }: { id: number } = await request.json();
  await prisma.product.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
