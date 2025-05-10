"use client";

import React, { useState } from "react";
import { SmartphoneCharacteristic } from "@prisma/client";
import { CharacteristicItem } from "./characteristic-item";

interface Props {
  characteristics: (SmartphoneCharacteristic & { category: { name: string } })[];
}

export const CharacteristicsList: React.FC<Props> = ({ characteristics }) => {
  // Группируем характеристики по категориям
  const groupedCharacteristics = characteristics.reduce((acc, item) => {
    const categoryName = item.category?.name || "Без категории";
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(item);
    return acc;
  }, {} as Record<string, (SmartphoneCharacteristic & { category: { name: string } })[]>);

  return (
    <div className="flex">

      {/* Правая колонка с характеристиками */}
      <div>
        {Object.keys(groupedCharacteristics).map((categoryName) => {
          const categoryItems = groupedCharacteristics[categoryName];
          const [isExpanded, setIsExpanded] = useState(false);
          const visibleItems = isExpanded ? categoryItems : categoryItems.slice(0, 3);

          return (
            <div key={categoryName} className="mb-6">
              <h3 className="text-xl font-extrabold text-gray-800 my-2">{categoryName}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {visibleItems.map((item) => (
                  <CharacteristicItem
                    key={item.id}
                    characteristic={item.characteristic}
                    value={item.value}
                  />
                ))}
              </div>
              {categoryItems.length > 3 && (
                <button
                  className="mt-2 text-blue-500 hover:underline"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Скрыть" : "Показать все"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
