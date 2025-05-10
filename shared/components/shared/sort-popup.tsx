'use client';

import React from "react";
import { cn } from "@/shared/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { useFilters } from "@/shared/hooks";

interface Props {
  className?: string;
}

const sortOptions = [
  { label: "По алфавиту", value: "name" },
  { label: "Сначала недорогие", value: "price_asc" },
  { label: "Сначала дорогие", value: "price_desc" },
];

export const SortPopup: React.FC<Props> = ({ className }) => {
  const filters = useFilters();

  const currentSortLabel = sortOptions.find(opt => opt.value === filters.sort)?.label || "По алфавиту";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer",
            className
          )}
        >
          <ArrowUpDown className="w-4 h-4" />
          <b>Сортировка:</b>
          <b className="text-primary">{currentSortLabel}</b>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-2 bg-white shadow-md rounded-md">
        <ul>
          {sortOptions.map((option) => (
            <li
              key={option.value}
              className={cn(
                "p-2 px-4 cursor-pointer rounded-md",
                filters.sort === option.value 
                  ? "bg-primary text-white" 
                  : "hover:bg-secondary hover:text-primary"
              )}
              onClick={() => filters.setSort(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
