
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';
import { CreateCartItemValues } from '@/shared/services/dto/cart';
import logger from '@/shared/lib/logger';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      logger.info(`[CART_GET] Токен отсутствует, возвращаем пустую корзину`);
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    logger.error(`[CART_GET] Ошибка: ${error instanceof Error ? error.message : String(error)}`);
    return NextResponse.json({ message: 'Не удалось получить корзину'}, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token){
      token = crypto.randomUUID();
      logger.info(`[CART_POST] Новый токен создан: ${token}`);
    }
    
    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    logger.info(`[CART_POST] Добавление товара. CartID: ${userCart.id}, ProductID: ${data.productId}`);

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productId: data.productId,
      }
    })
    if (findCartItem){
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1
        }
      });
      logger.info(`[CART_POST] Увеличено количество товара. CartItemID: ${findCartItem.id}, NewQuantity: ${findCartItem.quantity + 1}`);
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: data.productId,
          quantity: 1,
        }
      })
      logger.info(`[CART_POST] Новый товар добавлен в корзину. ProductID: ${data.productId}`);
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    logger.info(`[CART_POST] Корзина обновлена. Token: ${token}, TotalAmount: ${updatedUserCart?.totalAmount}`);

    const resp = NextResponse.json(updatedUserCart)
    resp.cookies.set('cartToken', token)
    return resp;

  } catch (error){
    logger.error(`[CART_POST] Ошибка: ${error instanceof Error ? error.message : String(error)}`);
    return NextResponse.json({ message: 'Не удалось создать корзину'}, { status: 500 })
  }
}


