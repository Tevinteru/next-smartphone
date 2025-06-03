"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet";
import { Filters } from "./filters";
import { Button } from "@/shared/components/ui/button";
import { Filter } from "lucide-react";

export const AdaptiveFilters: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Кнопка для открытия фильтров на мобильных устройствах */}
      <div className="md:hidden flex justify-end">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTitle hidden />
          <SheetDescription hidden />
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Фильтры
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-[300px] flex flex-col">
            <div className="flex-1 overflow-auto p-4">
              {/* Только при открытии */}
              {isOpen && <Filters />}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Фильтры для десктопов */}
      <div className="hidden md:block">
        <Filters />
      </div>
    </>
  );
};
