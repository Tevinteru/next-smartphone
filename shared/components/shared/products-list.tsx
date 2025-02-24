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
      <div className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8')}>
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
