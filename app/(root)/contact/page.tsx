import React from 'react';
import { Button, Title } from '@/shared/components'; // Кнопки из shadcn/ui или Radix
import Image from 'next/image';

export default async function HomePage() {
  return (
    <div className="container mx-auto px-6 py-8 md:py-8">
      {/* Заголовок */}
      <Title
        size="lg"
        text="Контакты"
        className="text-center text-4xl md:text-5xl font-extrabold text-primary mb-8"
      />

      {/* Описание */}
      <div className="text-center mb-16">
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Мы всегда рады помочь вам! Свяжитесь с нами по указанным контактам или посетите наш офис. Наша команда готова ответить на все ваши вопросы.
        </p>
      </div>

      {/* Галерея фотографий */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Фото 1 */}
        <div className="flex flex-col items-center">
          <div className="w-full h-[300px] relative rounded-lg overflow-hidden">
            <Image
              src="/images/site/contact1.jpg"
              alt="Менеджер по продажам"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center mt-4">
            <h3 className="text-xl font-semibold text-gray-800">Алексей Иванов</h3>
            <p className="text-gray-600">Менеджер по продажам</p>
            <p className="text-gray-600">+7 (999) 123-45-67</p>
          </div>
        </div>

        {/* Фото 2 */}
        <div className="flex flex-col items-center">
          <div className="w-full h-[300px] relative rounded-lg overflow-hidden">
            <Image
              src="/images/site/contact3.jpg"
              alt="Техническая поддержка"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center mt-4">
            <h3 className="text-xl font-semibold text-gray-800">Мария Петрова</h3>
            <p className="text-gray-600">Техническая поддержка</p>
            <p className="text-gray-600">+7 (999) 765-43-21</p>
          </div>
        </div>

        {/* Фото 3 */}
        <div className="flex flex-col items-center">
          <div className="w-full h-[300px] relative rounded-lg overflow-hidden">
            <Image
              src="/images/site/contact2.jpg"
              alt="Маркетинг"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center mt-4">
            <h3 className="text-xl font-semibold text-gray-800">Дмитрий Сидоров</h3>
            <p className="text-gray-600">Отдел маркетинга</p>
            <p className="text-gray-600">+7 (999) 987-65-43</p>
          </div>
        </div>

        {/* Фото 4 */}
        <div className="flex flex-col items-center">
          <div className="w-full h-[300px] relative rounded-lg overflow-hidden">
            <Image
              src="/images/site/contact4.jpg"
              alt="Офис в Москве"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center mt-4">
            <h3 className="text-xl font-semibold text-gray-800">Офис в Москве</h3>
            <p className="text-gray-600">ул. Тверская, 10</p>
            <p className="text-gray-600">+7 (495) 123-45-67</p>
          </div>
        </div>

        {/* Фото 5 */}
        <div className="flex flex-col items-center">
          <div className="w-full h-[300px] relative rounded-lg overflow-hidden">
            <Image
              src="/images/site/contact5.jpg"
              alt="Офис в Санкт-Петербурге"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center mt-4">
            <h3 className="text-xl font-semibold text-gray-800">Офис в Санкт-Петербурге</h3>
            <p className="text-gray-600">Невский проспект, 25</p>
            <p className="text-gray-600">+7 (812) 987-65-43</p>
          </div>
        </div>

        {/* Фото 6 */}
        <div className="flex flex-col items-center">
          <div className="w-full h-[300px] relative rounded-lg overflow-hidden">
            <Image
              src="/images/site/contact6.jpg"
              alt="Склад"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center mt-4">
            <h3 className="text-xl font-semibold text-gray-800">Склад</h3>
            <p className="text-gray-600">ул. Ленина, 15</p>
            <p className="text-gray-600">+7 (800) 123-45-67</p>
          </div>
        </div>
      </div>

    </div>
  );
};