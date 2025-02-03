'use client';

import React from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';
import { cn } from '@/shared/lib/utils';

interface Props {
  products: any[];
  className?: string;
}

export const ProductsList: React.FC<Props> = ({
  products,
  className,
}) => {

  return (
    <div className={className}>
      <div className={cn('grid grid-cols-3 gap-[50px]')}>
        {products
          .map((product, i) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.price}
            />
          ))}
      </div>
    </div>
  );
};
