import React from 'react';
import { Button } from '@/shared/components/ui/button';
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
    <div className={cn(className, "shadow-md rounded-lg flex flex-col w-full")}>
      <Link href={`/product/${id}`} className="flex flex-col flex-grow">
        {/* Контейнер для изображения с серым фоном и отступами */}
        <div className="relative bg-secondary rounded-t-lg h-[200px] md:h-[260px] flex items-center justify-center p-4">
          <Image
            src={imageUrl || '/assets/images/smartphone-placeholder.png'}
            width={175}
            height={175}
            alt="Товар"
            className="object-contain w-full h-full"
            priority={true}

          />
        </div>

        {/* Контент карточки */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Название товара */}
          <Title text={name} size="sm" className="mb-2 line-clamp-2" />

          {/* Цена и кнопка */}
          <div className="mt-auto flex flex-wrap justify-between items-center gap-2">
            <span className="text-lg sm:text-xl md:text-2xl font-bold whitespace-nowrap">
              {price} ₽
            </span>
            <Button variant="default" size="sm" className="text-sm px-2 py-1 sm:px-4 sm:py-2">
              Подробнее
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};