"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet";
import { Filters } from "./filters";
import { Button } from "@/shared/components/ui/button";
import { Menu } from "lucide-react";

export const AdaptiveFilters: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Кнопка для открытия фильтров на мобильных устройствах */}
      <div className="md:hidden flex justify-end">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTitle hidden={true} />
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Menu size={16} />
              Фильтры
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-[300px]">
            <Filters className="p-4" />
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