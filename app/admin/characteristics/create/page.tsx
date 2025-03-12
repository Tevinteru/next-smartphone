'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCharacteristicStore } from '@/shared/store/admin/characteristic';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label'; // Импорт компонента Label
import { Input, Select } from '@/shared/components';
import { SelectContent, SelectItem, SelectTrigger } from '@/shared/components/ui/select';

export default function CreateCharacteristicPage() {
  const [characteristic, setCharacteristic] = useState('');
  const [value, setValue] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const router = useRouter();
  const { addCharacteristic, fetchCategories, categories } = useCharacteristicStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryId) {
      await addCharacteristic({ characteristic, value, categoryId });
      router.push('/admin/characteristics');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Создать характеристику</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Поле для Названия характеристики */}
        <div>
          <Label htmlFor="characteristic" className="text-xl mb-2 block">Название характеристики:</Label>
          <Input
            id="characteristic"
            className="border p-2 w-full md:text-lg"
            value={characteristic}
            onChange={(e) => setCharacteristic(e.target.value)}
            placeholder="Введите название характеристики"
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
            placeholder="Введите значение"
            required
          />
        </div>

        {/* Поле для выбора категории */}
        <div>
          <Label htmlFor="categoryId" className="text-xl mb-2 block">Выберите категорию:</Label>
          <Select
            value={categoryId ? categoryId.toString() : "0"}  // Значение по умолчанию будет "0"
            onValueChange={(value) => setCategoryId(Number(value))}
            required
          >
            <SelectTrigger className="border p-2 w-full md:text-lg">
              <span className="text-lg md:text-lg">{categoryId ? categories.find(cat => cat.id === categoryId)?.name : 'Выберите категорию'}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0" disabled>Выберите категорию</SelectItem> {/* Ставим "0" как значение для плейсхолдера */}
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="mt-4">Создать</Button>
      </form>
    </div>
  );
}
