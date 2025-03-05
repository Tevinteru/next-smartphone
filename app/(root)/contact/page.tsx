import React from 'react';
import { Button, Title } from '@/shared/components'; // Кнопки из shadcn/ui или Radix

import Image from 'next/image';
import { cn } from '@/shared/lib/utils';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-6 py-16 md:py-24">
      {/* Заголовок */}
      <Title size="lg" text="Контакты" className="text-center text-4xl md:text-5xl font-extrabold text-primary mb-12" />
      
      {/* Введение */}
      <div className="text-center mb-16">
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Свяжитесь с нами, и мы обязательно ответим на все ваши вопросы. Наши контактные данные и места для встреч — всегда под рукой.
        </p>
      </div>

      {/* Галерея */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
        <div className="group relative">
          <Image
            src="/images/contact1.jpg"
            alt="Контакт 1"
            width={400}
            height={300}
            className="rounded-xl object-cover transition-transform transform group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-lg p-4 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity">
            Наш офис
          </div>
        </div>

        <div className="group relative">
          <Image
            src="/images/contact2.jpg"
            alt="Контакт 2"
            width={400}
            height={300}
            className="rounded-xl object-cover transition-transform transform group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-lg p-4 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity">
            Зона отдыха
          </div>
        </div>

        <div className="group relative">
          <Image
            src="/images/contact3.jpg"
            alt="Контакт 3"
            width={400}
            height={300}
            className="rounded-xl object-cover transition-transform transform group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-lg p-4 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity">
            Вдохновляющие идеи
          </div>
        </div>

        <div className="group relative">
          <Image
            src="/images/contact4.jpg"
            alt="Контакт 4"
            width={400}
            height={300}
            className="rounded-xl object-cover transition-transform transform group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-lg p-4 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity">
            Гибкость работы
          </div>
        </div>

        <div className="group relative">
          <Image
            src="/images/contact5.jpg"
            alt="Контакт 5"
            width={400}
            height={300}
            className="rounded-xl object-cover transition-transform transform group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-lg p-4 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity">
            Обсуждение проектов
          </div>
        </div>

        <div className="group relative">
          <Image
            src="/images/contact6.jpg"
            alt="Контакт 6"
            width={400}
            height={300}
            className="rounded-xl object-cover transition-transform transform group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-lg p-4 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity">
            Уютная атмосфера
          </div>
        </div>
      </div>

      {/* Кнопка CTA */}
      <div className="text-center mt-12">
        <Button variant="outline" className="px-8 py-4 text-xl border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300">
          Связаться с нами
        </Button>
      </div>
    </div>
  );
};

export default ContactPage;
