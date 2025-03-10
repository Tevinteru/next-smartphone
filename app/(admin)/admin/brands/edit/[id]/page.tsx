'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useBrandStore } from '@/shared/store/admin/brand';
import { Button } from '@/shared/components/ui/button';

export default function EditBrandPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { brands, updateBrand } = useBrandStore();
  const [name, setName] = useState('');

  useEffect(() => {
    const brand = brands.find((b) => b.id === Number(id));
    if (brand) setName(brand.name);
  }, [brands, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBrand(Number(id), name);
    router.push('/admin/brands');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Редактировать бренд</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border p-2 w-full" value={name} onChange={(e) => setName(e.target.value)} required />
        <Button type="submit">Сохранить</Button>
      </form>
    </div>
  );
}