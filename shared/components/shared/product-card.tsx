import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, className }) => {
  return (
    <div className={cn(className, "shadow-md rounded-lg")}> 
      <Link href={`/product/${id}`}>
        <div className="relative bg-secondary rounded-t-lg h-[20 0px] md:h-[260px] flex items-center justify-center">
          <Image src={imageUrl} width={175} height={175} alt="Товар" />
        </div>

        <div className="p-4">
          <Title text={name} size="sm" className="mb-1" />

          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold">
              {price} ₽
            </span>

            <Button variant="default" size="sm">
              Подробнее
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};
