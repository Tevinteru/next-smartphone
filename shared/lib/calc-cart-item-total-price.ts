import { Product } from "@prisma/client";
import { CartItemDTO } from "../services/dto/cart";

type Item = {
  productItem: Product;
  quantity: number;
};

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  return item.product.price * item.quantity;
};
