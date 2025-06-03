"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { CartButton, ProfileButton } from "./index";
import { ShoppingBag, Info, SquareUserRound } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  hasCart?: boolean;
  onSignIn: () => void;
}

export const MobileMenu: React.FC<Props> = ({ isOpen, onClose, hasCart, onSignIn }) => {
  return (
    <div className={cn("fixed inset-0 z-50 transition-all", isOpen ? "opacity-100 visible" : "opacity-0 invisible")}>
      {/* Затемнённый фон */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Панель меню */}
      <div
        className={cn(
          "absolute right-0 top-0 h-full w-4/5 sm:w-1/2 bg-white p-6 shadow-xl rounded-l-3xl transition-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Меню</h2>
          <Button variant="ghost" onClick={onClose} className="text-gray-500 hover:text-gray-800">
            Закрыть
          </Button>
        </div>
        
        <div className="flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-primary py-2">
            {/* Кнопки профиля и корзины */}
            <ProfileButton onClickSignIn={onSignIn} />
            {hasCart && isOpen && <CartButton />}
        </div>

        {/* Ссылки */}
        <div className="mt-4 space-y-2">
          <Link href="/catalog" className="flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-primary py-2">
            <ShoppingBag size={18} />
            Каталог
          </Link>
          <Link href="/contacts" className="flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-primary py-2">
            <Info size={18} />
            Контакты
          </Link>
          <Link href="/about" className="flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-primary py-2">
            <SquareUserRound size={18} />
            О нас
          </Link>
        </div>
      </div>
    </div>
  );
};
