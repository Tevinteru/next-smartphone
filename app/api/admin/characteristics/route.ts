import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

// GET: Получить все характеристики
export async function GET() {
  const characteristics = await prisma.smartphoneCharacteristic.findMany({
    include: { category: true },
  });
  return NextResponse.json(characteristics);
}

// POST: Создать новую характеристику
export async function POST(request: Request) {
  const { smartphoneId, characteristic, value, categoryId } = await request.json();
  const newCharacteristic = await prisma.smartphoneCharacteristic.create({
    data: { smartphoneId, characteristic, value, categoryId },
  });
  return NextResponse.json(newCharacteristic, { status: 201 });
}

// PUT: Обновить характеристику
export async function PUT(request: Request) {
  const { id, ...updateData } = await request.json();
  const updatedCharacteristic = await prisma.smartphoneCharacteristic.update({
    where: { id },
    data: updateData,
  });
  return NextResponse.json(updatedCharacteristic);
}

// DELETE: Удалить характеристику
export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.smartphoneCharacteristic.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}