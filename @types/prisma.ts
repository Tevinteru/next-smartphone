import { Prisma, Order  } from '@prisma/client';

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    smartphoneCharacteristics: {
      include: {
        category: true;
      };
    };
  };
}>;
// Добавляем новый тип для заказов
export type OrderWithItems = Order & {
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
    name?: string;
    // Другие поля, которые хранятся в JSON items
  }>;
};
