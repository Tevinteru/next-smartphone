import React from 'react';
import { Button, Title } from '@/shared/components'; // Кнопки из shadcn/ui или Radix
import Image from 'next/image';
import { Truck, ShieldCheck, Headphones } from 'lucide-react'; // Иконки из Lucide
import Link from "next/link";

export default function HomePage() {
  // Пример данных для популярных товаров
  const popularProducts = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      price: '89 999 ₽',
      image: '/assets/product-images/3b288c2119894fed6f39fe310ae05f57ef276a24ea4fbc2bd9425df6cf0d549e.jpg.webp',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23',
      price: '80 999 ₽',
      image: '/assets/product-images/4fea4bc87792b8698618a948b7ac0ba847a895bec6d7294e720e291b879a75c9.jpg.webp',
    },
    {
      id: 3,
      name: 'Google Pixel 7',
      price: '70 999 ₽',
      image: '/assets/product-images/6aa89750d93d67b3de665eafd7d17257061dc03c617bcc381360490a7afb7f7a.jpg.webp',
    },
    {
      id: 4,
      name: 'Xiaomi 13 Pro',
      price: '65 999 ₽',
      image: '/assets/product-images/8dfd83d12323212c1428648dbba8ae2aa5b067afd81274903e14e53d5c30d02c.jpg.webp',
    },
  ];

  return (
    <div>
      {/* Hero-секция */}
      <div className="relative w-full h-[600px] flex items-center justify-start text-left text-white px-6 sm:px-12">
        {/* Фото через компонент Image */}
        <Image
          src="/images/site/hero-banner.jpg"
          alt="Фоновый баннер"
          fill
          priority={true}
          className="absolute inset-0 z-0 object-cover"
        />
        <div className="relative z-10 flex flex-col items-start justify-center md:pl-48">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Лучшие смартфоны
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8">
            Выберите свой идеальный смартфон среди топовых моделей
          </p>
          <Link href={"/catalog"}>
            <Button
              variant="outline"
              className="px-8 py-4 text-xl border-white text-white hover:bg-white hover:text-black transition-colors duration-300"
            >
              Посмотреть каталог
            </Button>
          </Link>
        </div>
      </div>

      {/* Популярные товары */}
      <div className="container mx-auto px-6 py-12">
        <Title
          size="lg"
          text="Популярные товары"
          className="text-center text-4xl md:text-5xl font-extrabold text-primary mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularProducts.map((product) => (
            <div key={product.id} className="text-center">
              <div className="relative flex justify-center h-64 w-full rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-contain w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Преимущества магазина */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <Title
            size="lg"
            text="Почему выбирают нас?"
            className="text-center text-4xl md:text-5xl font-extrabold text-primary mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Truck className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Бесплатная доставка</h3>
              <p className="text-gray-600">Доставим ваш заказ быстро и бесплатно</p>
            </div>

            <div className="text-center">
              <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Гарантия качества</h3>
              <p className="text-gray-600">Все товары проходят тщательную проверку</p>
            </div>

            <div className="text-center">
              <Headphones className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Поддержка 24/7</h3>
              <p className="text-gray-600">Мы всегда готовы помочь вам</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
