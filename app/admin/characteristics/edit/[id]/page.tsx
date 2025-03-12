'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCharacteristicStore } from '@/shared/store/admin/characteristic';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label'; // Импорт компонента Label
import { Input } from '@/shared/components';

export default function EditCharacteristicPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { characteristics, updateCharacteristic } = useCharacteristicStore();
  const [characteristic, setCharacteristic] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const char = characteristics.find((c) => c.id === Number(id));
    if (char) {
      setCharacteristic(char.characteristic);
      setValue(char.value);
    }
  }, [characteristics, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCharacteristic(Number(id), { characteristic, value });
    router.push('/admin/characteristics');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Редактировать характеристику</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Поле для Названия характеристики */}
        <div>
          <Label htmlFor="characteristic" className="text-xl mb-2 block">Название характеристики:</Label>
          <Input
            id="characteristic"
            className="border p-2 w-full md:text-lg"
            value={characteristic}
            onChange={(e) => setCharacteristic(e.target.value)}
            required
          />
        </div>

        {/* Поле для Значения характеристики */}
        <div>
          <Label htmlFor="value" className="text-xl mb-2 block">Значение характеристики:</Label>
          <Input
            id="value"
            className="border p-2 w-full md:text-lg"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="mt-4">Сохранить</Button>
      </form>
    </div>
  );
}
