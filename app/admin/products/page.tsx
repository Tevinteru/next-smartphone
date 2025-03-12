'use client';

import { useEffect } from 'react';
import { useProductStore } from '@/shared/store/admin/product';
import { Button } from '@/shared/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import Link from 'next/link';
import { Title } from '@/shared/components';

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductsPage() {
  const { products, fetchProducts, deleteProduct } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="p-6">
      <Title size="xl" text="Товары" className="text-2xl font-bold pb-6"/>
      <Link href="/admin/products/create">
        <Button className='text-md font-bold'>Добавить товар</Button>
      </Link>
      <Table className='text-xl mt-6'>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price} ₽</TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <Link href={`/admin/products/edit/${product.id}`}>
                    <Button variant="outline" size="icon">✏️</Button>
                  </Link>
                  <Button variant="destructive" size="icon" onClick={() => deleteProduct(product.id)}>🗑</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
