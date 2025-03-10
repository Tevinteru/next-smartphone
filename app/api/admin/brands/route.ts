import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

// GET: Получить все бренды
export async function GET() {
  const brands = await prisma.brand.findMany();
  return NextResponse.json(brands);
}

// POST: Создать новый бренд
export async function POST(request: Request) {
  const { name } = await request.json();
  const newBrand = await prisma.brand.create({ data: { name } });
  return NextResponse.json(newBrand, { status: 201 });
}

// PUT: Обновить бренд
export async function PUT(request: Request) {
  const { id, ...updateData } = await request.json();
  const updatedBrand = await prisma.brand.update({
    where: { id },
    data: updateData,
  });
  return NextResponse.json(updatedBrand);
}

// DELETE: Удалить бренд
export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.brand.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}