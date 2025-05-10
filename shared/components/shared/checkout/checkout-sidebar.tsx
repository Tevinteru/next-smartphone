import React from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Truck, LogIn } from 'lucide-react';
import { Button, Skeleton } from '../../ui';
import { cn } from '@/shared/lib/utils';
import { useSession } from 'next-auth/react';

const DELIVERY_PRICE = 250;

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {
  const { data: session } = useSession();
  const totalPrice = totalAmount + DELIVERY_PRICE;
  const isAuthenticated = !!session;

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">{totalPrice} ₽</span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${totalAmount} ₽`}
      />
      
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${DELIVERY_PRICE} ₽`}
      />
      <div className='flex pt-4 justify-center'>
        {isAuthenticated ? (
          <Button
          loading={loading}
          variant="default"
          type="submit"
          className="text-lg h-14 w-full rounded-md px-6"
          >
            Оформить заказ
            <ArrowRight size={18} className="ml-2" />
          </Button>
        ) : (
          <Button
          variant="default"
          type="button"
          className="text-sm h-14 w-full rounded-md px-6"
          >
              Авторизуйтесь, чтобы оформить заказ
            <LogIn size={18} className="ml-2" />
          </Button>
        )}
      </div>

    </WhiteBlock>
  );
};