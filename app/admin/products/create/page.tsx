'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useProductStore } from '@/shared/store/admin/product';
import { Button } from '@/shared/components/ui/button';
import { Input, Label, Select, Title } from '@/shared/components';
import { Textarea } from '@/shared/components/ui/textarea';
import { SelectContent, SelectItem, SelectTrigger } from '@/shared/components/ui/select';

// Интерфейсы для типизации
interface Characteristic {
  characteristic: string;
  value: string;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

export default function CreateProductPage() {
  const router = useRouter();
  const { createProduct } = useProductStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [brandId, setBrandId] = useState(0);
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([{ characteristic: '', value: '', categoryId: 0 }]);
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Загрузка категорий с сервера
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories');
      const data: Category[] = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return imageUrl; // Если файла нет, возвращаем старый URL

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImageUrl(data.imageUrl); // Обновляем стейт с новым URL
        return data.imageUrl;
      } else {
        console.error('Ошибка загрузки файла');
        return imageUrl;
      }
    } catch (error) {
      console.error('Ошибка сети', error);
      return imageUrl;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalImageUrl = file ? await handleUpload() : imageUrl; // Если есть файл, загружаем его

    const newProductData = {
      name,
      description,
      price,
      imageUrl: finalImageUrl,
      brandId,
      smartphoneCharacteristics: characteristics.map((char) => ({
        name: char.characteristic,
        value: char.value,
        categoryId: char.categoryId,
      })),
    };

    await createProduct(newProductData);
    router.push('/admin/products');
  };

  const addCharacteristic = () => {
    setCharacteristics([...characteristics, { characteristic: '', value: '', categoryId: 0 }]);
  };

  const removeCharacteristic = (index: number) => {
    setCharacteristics(characteristics.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <Title size="xl" text="Создать товар" className="mb-4 font-bold" />
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <Label className="text-lg">Название товара</Label>
          <Input
            className="border md:text-lg w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label className="text-lg">Описание товара</Label>
          <Textarea
            className="border md:text-lg w-full py-1" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <Label className="text-lg">Цена</Label>
          <Input
            className="border text-lg md:text-lg w-full"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <Label className="text-lg">Изображение</Label>
          <Input className="text-lg md:text-lg" type="file" accept="image/*" onChange={handleFileChange} />
          {imageUrl && (
            <Image src={imageUrl} alt="Превью" width={128} height={128} className="mt-2 object-cover" />
          )}
        </div>

        <div>
          <Label className="text-lg">ID бренда</Label>
          <Input
            className="border text-lg md:text-lg w-full"
            type="number"
            value={brandId}
            onChange={(e) => setBrandId(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Характеристики</h3>
          {characteristics.map((char, index) => (
            <div key={index} className="bg-gray-50 p-5 rounded-xl shadow-sm mb-4">
              <Label className="block md:text-lg font-medium text-gray-700 mb-2">
                Категория:
                <Select
                  value={char.categoryId.toString()}
                  onValueChange={(value) => {
                    const updatedCharacteristics = [...characteristics];
                    updatedCharacteristics[index].categoryId = Number(value);
                    setCharacteristics(updatedCharacteristics);
                  }}
                >
                  <SelectTrigger className="border p-2 w-full text-lg md:text-lg">
                    <span className="md:text-lg text-lg">
                      {char.categoryId === 0 ? 'Не выбрана' : categories.find(cat => cat.id === char.categoryId)?.name}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="md:text-lg" value="0">Не выбрана</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Label>

              <div className="mb-3">
                <Label className="block text-lg text-gray-600 mb-1">Характеристика</Label>
                <Input
                  className="text-lg md:text-lg w-full"
                  value={char.characteristic}
                  onChange={(e) => {
                    const updatedCharacteristics = [...characteristics];
                    updatedCharacteristics[index].characteristic = e.target.value;
                    setCharacteristics(updatedCharacteristics);
                  }}
                  required
                />
              </div>

              <div>
                <Label className="block text-lg text-gray-600 mb-1">Значение характеристики</Label>
                <Input
                  className="text-lg md:text-lg w-full"
                  value={char.value}
                  onChange={(e) => {
                    const updatedCharacteristics = [...characteristics];
                    updatedCharacteristics[index].value = e.target.value;
                    setCharacteristics(updatedCharacteristics);
                  }}
                  required
                />
              </div>

              <Button type="button" variant="outline" onClick={() => removeCharacteristic(index)} className="mt-4">
                Удалить характеристику
              </Button>
            </div>
          ))}

          <Button type="button" variant="destructive" onClick={addCharacteristic}>
            Добавить характеристику
          </Button>
        </div>

        <Button type="submit">Создать</Button>
      </form>
    </div>
  );
}
