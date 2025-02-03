import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';
import Link from 'next/link';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, className }) => {
  return (
    <div className={cn(className)}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt="Logo" />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3" />

        <div className="flex justify-between items-center mt-2">
          <span className="text-[20px]">
            <b>{price} ₽</b>
          </span>

          <Button variant="default" className="text-base font-bold">
            Подробнее
          </Button>
        </div>
      </Link>
    </div>
  );
};
