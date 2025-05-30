'use client';

import React from 'react';

import { FilterCheckbox, FilterChecboxProps } from './filter-checkbox';
import { Input } from '../ui/input';

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  selected?: Set<string>;
  onClickCheckbox?: (id: string) => void;
  loading?: boolean;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 3,
  searchInputPlaceholder = 'Поиск...',
  className,
  selected,
  onClickCheckbox,
  loading,
  name,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const filtredItems = items.filter((item) =>
    item.text.toLowerCase().includes(searchValue.toLowerCase()),
  );

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="w-full mb-4 h-6 bg-gray-200 rounded-[8px] animate-pulse" />
          ))}

        <div className="w-28 h-4 bg-gray-200 rounded-[8px] animate-pulse" />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {(showAll ? filtredItems : defaultItems || filtredItems).map((item) => (
          <FilterCheckbox
            key={String(item.value)}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button  onClick={() => {
            setShowAll(!showAll);
            if (showAll) {
              setSearchValue('');
            }
          }} className="text-primary mt-3">
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};
