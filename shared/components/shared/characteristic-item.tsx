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
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
      <span className="text-sm font-semibold text-gray-800">{characteristic}</span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
};