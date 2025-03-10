'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBrandStore } from '@/shared/store/admin/brand';
import { Button } from '@/shared/components/ui/button';
import { Input, Title } from '@/shared/components';

export default function CreateBrandPage() {
  const [name, setName] = useState('');
  const router = useRouter();
  const { addBrand } = useBrandStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBrand(name);
    router.push('/admin/brands');
  };

  return (
    <div className="p-6">
      <Title size="xl" text="Создать бренд" className="mb-4 font-bold" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input className="border p-2 w-full" value={name} onChange={(e) => setName(e.target.value)} placeholder="Название бренда" required />
        <Button type="submit">Создать</Button>
      </form>
    </div>
  );
}