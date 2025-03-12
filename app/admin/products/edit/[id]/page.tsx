'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useProductStore } from '@/shared/store/admin/product';
import { Button } from '@/shared/components/ui/button';
import Image from 'next/image';
import { Input, Label, Title } from '@/shared/components';
import { Textarea } from '@/shared/components/ui/textarea';

interface Characteristic {
  characteristic: string;
  value: string;
  categoryId: number;
  category?: { name: string }; // Можно добавить тип категории, если она существует
}

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { updateProduct } = useProductStore();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [brandId, setBrandId] = useState(0);
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/admin/products/${id}`);
      const data = await res.json();
      if (data) {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setImageUrl(data.imageUrl);
        setBrandId(data.brandId);
        setCharacteristics(data.smartphoneCharacteristics);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    let finalImageUrl = imageUrl;  // Сначала используем существующий imageUrl
  
    // Проверяем, если файл выбран, то загружаем его
    if (file) {
      const uploadedImageUrl = await handleUpload(); // Получаем новый путь к изображению
      finalImageUrl = uploadedImageUrl;  // Обновляем переменную для пути к изображению
    }
  
    // После загрузки фото и получения нового imageUrl, отправляем обновленные данные
    const updatedProductData = {
      name,
      description,
      price,
      imageUrl: finalImageUrl,  // Используем finalImageUrl, который мы обновили
      brandId,
      smartphoneCharacteristics: characteristics.map((char) => ({
        name: char.characteristic,
        value: char.value,
        categoryId: char.categoryId,
      })),
    };
  
  
    await updateProduct(Number(id), updatedProductData);
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
      <Title size="xl" text="Редактировать товар" className="mb-4 font-bold text-2xl" />
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <Label className="text-lg">Название товара</Label>
          <Input
            className="border text-lg w-full py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
  
        <div>
          <Label className="text-lg">Описание товара</Label>
          <Textarea
            className="border text-lg w-full py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
  
        <div>
          <Label className="text-lg">Цена</Label>
          <Input
            className="border text-lg w-full py-2"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
  
        <div>
          <Label className="text-lg">Изображение</Label>
          <Input
            className="text-lg w-full"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {imageUrl && <Image
               src={imageUrl}
               alt="Превью"
               width={32}  // Указываем ширину
               height={32} // Указываем высоту
               className="mt-2 object-cover rounded-lg"
            />}
        </div>
  
        <div>
          <Label className="text-lg">ID бренда</Label>
          <Input
            className="border text-lg w-full py-2"
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
              <Label className="block text-lg font-medium text-gray-700 mb-2">
                  Категория: {char.category?.name || 'Неизвестно'}
              </Label>
  
              <div className="mb-3">
                <Label className="block text-lg text-gray-600 mb-1">Характеристика</Label>
                <Input
                  className="text-lg w-full py-2"
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
                  className="text-lg w-full py-2"
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
                variant="outline"
                onClick={() => removeCharacteristic(index)}
                className="mt-4 text-lg"
              >
                Удалить характеристику
              </Button>
            </div>
          ))}
  
          <Button type="button" className="text-lg" variant="destructive" onClick={addCharacteristic}>
            Добавить характеристику
          </Button>
        </div>
  
        <Button className="text-lg" type="submit">
          Сохранить
        </Button>
      </form>
    </div>
  );
  
}
