import React from 'react';

interface CharacteristicItemProps {
  characteristic: string;
  value: string;
}

export const CharacteristicItem: React.FC<CharacteristicItemProps> = ({
  characteristic,
  value,
}) => {
  return (
    <div className="flex flex-wrap justify-between min-w-0 gap-2">
      <span className="font-medium truncate max-w-[48%] min-w-0">{characteristic}</span>
      <span className="text-gray-700 text-right truncate max-w-[48%] min-w-0">{value}</span>
    </div>
  );
};