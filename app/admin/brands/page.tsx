'use client';

import { useEffect } from 'react';
import { useBrandStore } from '@/shared/store/admin/brand';
import { Button } from '@/shared/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import Link from 'next/link';
import { Title } from '@/shared/components';

export default function BrandsPage() {
  const { brands, fetchBrands, deleteBrand } = useBrandStore();

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return (
    <div className="p-6">
      <Title size='xl' text='Бренды' className="text-2xl font-bold pb-6" />
      <Link href="/admin/brands/create">
        <Button className="text-md font-bold">Добавить бренд</Button>
      </Link>
      <Table className="text-xl mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands.map((brand) => (
            <TableRow key={brand.id}>
              <TableCell>{brand.id}</TableCell>
              <TableCell>{brand.name}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/admin/brands/edit/${brand.id}`}>
                    <Button variant="outline" size="icon">✏️</Button>
                  </Link>
                  <Button variant="destructive" size="icon" onClick={() => deleteBrand(brand.id)}>🗑</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
