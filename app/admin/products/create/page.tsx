'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/shared/store/admin/product';
import { Button } from '@/shared/components/ui/button';
import { Input, Label, Select, Title } from '@/shared/components';
import { Textarea } from '@/shared/components/ui/textarea';
import { SelectContent, SelectItem, SelectTrigger } from '@/shared/components/ui/select';

export default function CreateProductPage() {
  const router = useRouter();
  const { createProduct } = useProductStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [brandId, setBrandId] = useState(0);
  const [characteristics, setCharacteristics] = useState<any[]>([{ characteristic: '', value: '', categoryId: 0 }]);
  const [file, setFile] = useState<File | null>(null);

  // Стейт для хранения категорий
  const [categories, setCategories] = useState<any[]>([]);

  // Загрузка категорий с сервера
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalImageUrl = imageUrl;  // Сначала используем существующий imageUrl

    // Если файл выбран, то загружаем его
    if (file) {
      const uploadedImageUrl = await handleUpload(); // Получаем новый путь к изображению
      finalImageUrl = uploadedImageUrl;  // Обновляем переменную для пути к изображению
    }

    // Отправляем новые данные на сервер для создания товара
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

    await createProduct(newProductData);  // Создание нового товара через store
    router.push('/admin/products');  // Перенаправляем на страницу со списком продуктов
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    // Загружаем файл на сервер
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      return data.imageUrl;  // Возвращаем путь, который получаем с сервера
    } else {
      console.error("Ошибка загрузки файла");
      return imageUrl;  // Если ошибка, оставляем старый путь
    }
  };

  // Добавить новое поле для характеристики
  const addCharacteristic = () => {
    setCharacteristics([
      ...characteristics,
      { characteristic: '', value: '', categoryId: 0 },
    ]);
  };

  // Удалить характеристику
  const removeCharacteristic = (index: number) => {
    setCharacteristics(characteristics.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <Title size="xl" text="Создать товар" className="mb-4 font-bold" />
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <Label className='text-lg'>Название товара</Label>
          <Input
            className="border md:text-lg w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label className='text-lg'>Описание товара</Label>
          <Textarea
            className="border md:text-lg w-full py-1" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <Label className='text-lg'>Цена</Label>
          <Input
            className="border text-lg md:text-lg w-full"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <Label className='text-lg'>Изображение</Label>
          <Input className='text-lg md:text-lg' type="file" accept="image/*" onChange={handleFileChange} />
          {imageUrl && <img src={imageUrl} alt="Превью" className="mt-2 w-32 h-32 object-cover" />}
        </div>

        <div>
          <Label className='text-lg'>ID бренда</Label>
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
                    <span className='md:text-lg text-lg'>{char.categoryId === 0 ? 'Не выбрана' : categories.find(cat => cat.id === char.categoryId)?.name}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="md:text-lg" value="0">Не выбрана</SelectItem>
                    {categories.map((category: any) => (
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

              <Button
                type="button"
                variant={'outline'}
                onClick={() => removeCharacteristic(index)}
                className="mt-4 md:text-lg"
              >
                Удалить характеристику
              </Button>
            </div>
          ))}

          <Button type="button" className="md:text-lg" variant={'destructive'} onClick={addCharacteristic}>
            Добавить характеристику
          </Button>
        </div>

        <Button className="md:text-lg" type="submit">Создать</Button>
      </form>
    </div>
  );
}
