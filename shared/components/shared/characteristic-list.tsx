"use client";

import React, { useState } from "react";
import { SmartphoneCharacteristic } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/shared/components/ui/card"; // Проверь путь
import { Separator, Button, CharacteristicItem } from "@/shared/components";

interface Props {
  characteristics: (SmartphoneCharacteristic & { category: { name: string } })[];
}

export const CharacteristicsList: React.FC<Props> = ({ characteristics }) => {
  const [expanded, setExpanded] = useState(false);

  // Группировка по категориям
  const groupedCharacteristics = characteristics.reduce((acc, item) => {
    const category = item.category?.name || "Без категории";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, (SmartphoneCharacteristic & { category: { name: string } })[]>);

  const categoryEntries = Object.entries(groupedCharacteristics);
  const visibleCategories = expanded ? categoryEntries : categoryEntries.slice(0, 2);

  return (
    <Card className="p-6 rounded-2xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Характеристики</CardTitle>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="space-y-6">
        {visibleCategories.map(([categoryName, items]) => (
          <div key={categoryName}>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{categoryName}</h3>
            {/* На мобилках - вертикальный список, на десктопе сетка из 3 колонок */}
            <div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-3">
              {items.map((item) => (
                <CharacteristicItem
                  key={item.id}
                  characteristic={item.characteristic}
                  value={item.value}
                />
              ))}
            </div>
            <Separator className="my-4" />
          </div>
        ))}
      </CardContent>

      {categoryEntries.length > 2 && (
        <CardFooter className="flex justify-center">
          <Button
            variant="ghost"
            className="text-xl bg-gray-100 w-full h-[50px]"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Скрыть характеристики" : "Показать все характеристики"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
