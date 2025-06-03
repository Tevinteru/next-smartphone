"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Button } from "../ui/button";
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
    <div className={cn(className, "flex flex-col gap-10 pb-16")}>
      {/* Основной блок */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white rounded-2xl shadow-xl">
        {/* Фото */}
        <div className="flex justify-center items-center">
          <img
            src={imageUrl}
            alt={name}
            className="w-full max-w-[250px] md:max-w-[400px] h-auto object-contain rounded-xl"
          />
        </div>

        {/* Инфо о продукте */}
        <div className="flex flex-col justify-start space-y-5">
          <Title text={name} size="xl" className="font-bold" />

          <div className="text-3xl font-extrabold text-primary">{price} ₽</div>

          <Button
            loading={loading}
            className="h-[50px] w-full text-lg rounded-xl"
            onClick={onSubmit}
          >
            Добавить в корзину
          </Button>

          {description && (
            <p className="text-gray-600 text-base leading-relaxed pt-2 border-t mt-4">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Характеристики */}
      <CharacteristicsList characteristics={characteristics} />
    </div>
  );
};
