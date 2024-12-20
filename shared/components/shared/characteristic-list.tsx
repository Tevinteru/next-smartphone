import React from 'react';
import { cn } from '@/shared/lib/utils';
import { CharacteristicItem } from './characteristic-item';

interface SmartphoneCharacteristic {
  id: number;
  characteristic: string;
  value: string;
}

interface Props {
  characteristics: SmartphoneCharacteristic[];
  className?: string;
}

export const CharacteristicsList: React.FC<Props> = ({
  characteristics,
  className,
}) => {
  return (
    <div className={cn('grid grid-cols-1 gap-4', className)}>
      {characteristics.map((item) => (
        <CharacteristicItem
          key={item.id}
          characteristic={item.characteristic}
          value={item.value}
        />
      ))}
    </div>
  );
};