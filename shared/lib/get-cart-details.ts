import { CartDTO } from "../services/dto/cart";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    disabled?: boolean;
  };

interface ReturnProps{
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.product.name,
        imageUrl: item.product.imageUrl,
        price: calcCartItemTotalPrice(item),
        disabled: false,
    })) as CartStateItem[];
    return {
        items,
        totalAmount: data.totalAmount,
    }
    
};
