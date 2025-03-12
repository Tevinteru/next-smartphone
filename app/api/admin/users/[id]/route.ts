import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { hashSync } from 'bcrypt';

export async function PUT(request: Request, { params }:  { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;  // Wait for params to resolve
  const { id } = resolvedParams;  // Now you can safely access id

  const { fullName, email, password, role } = await request.json();

  // Пример: если вы хотите, чтобы пароль был зашифрован
  const hashedPassword = await hashSync(password, 10);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        fullName,
        email,
        password: hashedPassword,  // Не забудьте хешировать пароль, если это необходимо
        role,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user in DB:', error);
    return new NextResponse('Failed to update user', { status: 500 });
  }
}
