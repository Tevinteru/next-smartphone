"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";

interface Props {
  className?: string;
}

const sortOptions = [
  { label: "По алфавиту", value: "name" },
  { label: "Сначала недорогие", value: "price_asc" },
  { label: "Сначала дорогие", value: "price_desc" },
];

export const SortPopup: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Получаем текущую сортировку из URL
  const currentSort = searchParams.get("sort") || "name";

  // Обновляем URL при выборе сортировки
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  };

  const currentSortLabel = sortOptions.find((opt) => opt.value === currentSort)?.label || "По алфавиту";

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
      <PopoverContent className="w-[240px]">
        <ul>
          {sortOptions.map((option) => (
            <li
              key={option.value}
              className={cn(
                "p-2 px-4 cursor-pointer rounded-md",
                currentSort === option.value 
                  ? "bg-primary text-white" 
                  : "hover:bg-secondary hover:text-primary"
              )}
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
