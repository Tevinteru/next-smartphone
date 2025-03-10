import React from 'react';
import { Button, Title } from '@/shared/components'; // Кнопки из shadcn/ui или Radix
import Image from 'next/image';

export default async function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-8 md:py-8">
      {/* Заголовок */}
      <Title
        size="lg"
        text="О нас"
        className="text-center text-4xl md:text-5xl font-extrabold text-primary mb-12"
      />

      {/* Основной контент */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Изображение */}
        <div className="flex-1">
          <Image
            src="/images/about1.jpg"
            alt="О нас"
            width={800}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Текст */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Кто мы?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Мы — команда энтузиастов, которая начала свой путь в 2015 году с небольшого магазина техники. Сегодня мы — один из ведущих онлайн-магазинов смартфонов, предлагающий широкий ассортимент устройств от мировых брендов.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Наша миссия — сделать технологии доступными для каждого. Мы тщательно отбираем каждый продукт, чтобы вы могли быть уверены в качестве и надежности вашего устройства.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Спасибо, что выбираете нас! Мы ценим каждого клиента и стремимся сделать ваш опыт покупок максимально приятным.
          </p>
           {/* Кнопка "Наши контакты" по центру */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="px-8 py-4 text-xl border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            >
              Наши контакты
            </Button>
          </div>
        </div>
      </div>

      {/* Преимущества */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Преимущество 1 */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Широкий ассортимент</h3>
          <p className="text-gray-600">
            У нас вы найдете смартфоны от всех ведущих брендов: Apple, Samsung, Xiaomi и других.
          </p>
        </div>

        {/* Преимущество 2 */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Гарантия качества</h3>
          <p className="text-gray-600">
            Все устройства проходят тщательную проверку перед продажей.
          </p>
        </div>

        {/* Преимущество 3 */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Поддержка 24/7</h3>
          <p className="text-gray-600">
            Наша служба поддержки всегда готова помочь вам с выбором или решением проблем.
          </p>
        </div>
      </div>
    </div>
  );
};