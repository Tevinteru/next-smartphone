import React from 'react';
import { SmartphoneCharacteristic } from '@prisma/client';
import { CharacteristicItem } from './characteristic-item';

interface Props {
  characteristics: (SmartphoneCharacteristic & { category: { name: string } })[];
}

export const CharacteristicsList: React.FC<Props> = ({ characteristics }) => {
  // Группируем характеристики по названию категории
  const groupedCharacteristics = characteristics.reduce((acc, item) => {
    const categoryName = item.category?.name || 'Без категории';
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(item);
    return acc;
  }, {} as Record<string, (SmartphoneCharacteristic & { category: { name: string } })[]>);

  return (
    <div>
      {Object.keys(groupedCharacteristics).map((categoryName) => {
        const categoryItems = groupedCharacteristics[categoryName];
        return (
          <div key={categoryName}>
            <h3 className="text-xl font-extrabold text-gray-800 my-4">{categoryName}</h3>
            <div className="grid grid-cols-1 gap-4">
              {categoryItems.map((item) => (
                <CharacteristicItem
                  key={item.id}
                  characteristic={item.characteristic}
                  value={item.value}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};