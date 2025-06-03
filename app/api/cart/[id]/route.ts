import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";
import logger from "@/shared/lib/logger";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    logger.info(`[CART_PATCH] Запрос на обновление количества. CartItemID: ${id}, Новое количество: ${data.quantity}, Token: ${token || 'отсутствует'}`);

    if (!token) {
      logger.warn(`[CART_PATCH] Токен отсутствует`);
      return NextResponse.json({ error: 'Cart token not found' });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id: Number(id) }
    });

    if (!cartItem) {
      logger.warn(`[CART_PATCH] Элемент корзины не найден. CartItemID: ${id}`);
      return NextResponse.json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.update({
      where: { id: Number(id) },
      data: { quantity: data.quantity }
    });

    logger.info(`[CART_PATCH] Количество товара обновлено. CartItemID: ${id}, Quantity: ${data.quantity}`);

    const updatedUserCart = await updateCartTotalAmount(token);

    logger.info(`[CART_PATCH] Корзина пересчитана. TotalAmount: ${updatedUserCart?.totalAmount}`);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    logger.error(`[CART_PATCH] Ошибка: ${error instanceof Error ? error.message : String(error)}`);
    return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = req.cookies.get('cartToken')?.value;
    const resolvedParams = await params;
    const { id } = resolvedParams;

    logger.info(`[CART_DELETE] Запрос на удаление товара. CartItemID: ${id}, Token: ${token || 'отсутствует'}`);

    if (!token) {
      logger.warn(`[CART_DELETE] Токен отсутствует`);
      return NextResponse.json({ error: 'Cart token not found' });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id: Number(id) }
    });

    if (!cartItem) {
      logger.warn(`[CART_DELETE] Элемент корзины не найден. CartItemID: ${id}`);
      return NextResponse.json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.delete({
      where: { id: Number(id) }
    });

    logger.info(`[CART_DELETE] Товар удалён из корзины. CartItemID: ${id}`);

    const updatedUserCart = await updateCartTotalAmount(token);

    logger.info(`[CART_DELETE] Корзина пересчитана. TotalAmount: ${updatedUserCart?.totalAmount}`);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    logger.error(`[CART_DELETE] Ошибка: ${error instanceof Error ? error.message : String(error)}`);
    return NextResponse.json({ message: 'Не удалось удалить корзину' }, { status: 500 });
  }
}
