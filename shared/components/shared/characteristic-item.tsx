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
    <div className="flex items-center justify-between py-2">
      <span className="font-semibold text-gray-800">{characteristic}</span>
      <span className="flex-1 mx-2 py-2 border-b-2 border-dotted border-gray-300"></span>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
};