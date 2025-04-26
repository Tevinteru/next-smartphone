import React from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutItem } from '../checkout-item';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  loading,
  className,
}) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(3)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.length === 0 ? (
              <p className="text-lg text-center m-5 text-gray-500">Корзина пуста</p> // Если товаров нет, отображаем сообщение
            ) : (
              items.map((item) => (
                <CheckoutItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  disabled={item.disabled}
                  onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                  onClickRemove={() => removeCartItem(item.id)}
                />
              ))
            )}
      </div>
    </WhiteBlock>
  );
};
