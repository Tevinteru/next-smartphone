"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Button } from "../ui";
import { SmartphoneCharacteristic } from "@prisma/client";
import { Title } from "./title";
import { CharacteristicsList } from "./characteristic-list";

interface Props {
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  loading?: boolean;
  onSubmit?: VoidFunction;
  characteristics: (SmartphoneCharacteristic & { category: { name: string } })[];
  className?: string;
}

export const ProductFormDetails: React.FC<Props> = ({
  name,
  imageUrl,
  description,
  price,
  characteristics,
  onSubmit,
  className,
  loading,
}) => {
  return (
    <div className={cn(className, "flex flex-1 flex-col")}>
      {/* Верхняя часть: фото и описание */}
      <div className="flex flex-col md:flex-row items-start h-[400px] gap-8 mb-4 rounded-lg shadow-2xl bg-white">
        {/* Картинка продукта */}
        <div className="flex-shrink-0 w-[500px] flex justify-center">
          <img
            src={imageUrl}
            alt={name}
            className="max-w-full p-8 max-h-[400px] object-cover"
          />
        </div>

        {/* Информация о продукте */}
        <div className="w-full h-full p-8">
          {/* Название продукта */}
          <Title text={name} size="lg" className="font-extrabold mb-4" />

          {/* Краткое описание */}
          {description && <p className="text-gray-500 mb-6">{description}</p>}

          {/* Цена */}
          <h1 className="text-xl font-extrabold text-gray-900 mb-6">
            {price} ₽
          </h1>
          
          {/* Кнопка добавления */}
          <Button
            loading={loading}
            className="h-[55px] px-10 text-base rounded-[18px]"
            onClick={onSubmit}
          >
            Добавить в корзину
          </Button>
        </div>
      </div>

      {/* Список характеристик */}
      <div className="w-full bg-gray-50 p-5 rounded-lg shadow-sm bg-white">
        <h2 className="text-2xl font-extrabold mb-4">
          Характеристики
        </h2>
        <CharacteristicsList characteristics={characteristics}/>
      </div>
    </div>
  );
};