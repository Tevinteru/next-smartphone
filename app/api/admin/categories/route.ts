import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET() {
  const categories = await prisma.characteristicCategory.findMany();
  return NextResponse.json(categories);
}
