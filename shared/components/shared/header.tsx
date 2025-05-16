"use client";

import { cn } from "@/shared/lib/utils";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, CartButton, AuthModal, ProfileButton, Title } from "./index";
import { ShoppingBag, Info, SquareUserRound, Menu } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { MobileMenu } from "./mobile-menu"; // Подключаем новый компонент
import { useSession } from "next-auth/react";

interface Props {
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ className, hasCart = true }) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-6 md:py-6 px-2 md:px-4">
        {/* Логотип и ссылки */}
        <div className="flex items-center gap-[90px]">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.png" width={40} height={40} alt="Logo" />
            <Title text="Смартфоны" size="md" className="font-bold uppercase" />
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/catalog" className="flex items-center gap-2 text-lg text-gray-700 hover:text-primary">
              <ShoppingBag size={18} />
              Каталог
            </Link>
            <Link href="/contact" className="flex items-center gap-2 text-lg text-gray-700 hover:text-primary">
              <Info size={18} />
              Контакты
            </Link>
            <Link href="/about" className="flex items-center gap-2 text-lg text-gray-700 hover:text-primary">
              <SquareUserRound size={18} />
              О нас
            </Link>
            {/* Админ-панель */}
             {isAdmin && (
              <Link href="/admin" className="flex items-center gap-2 text-lg text-gray-700 hover:text-primary font-semibold">
                Админ-Панель
              </Link>
            )}
          </div>
        </div>

        {/* Кнопки профиля, корзины и бургер-меню */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="hidden md:flex items-center space-x-2">
            <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
            {hasCart && <CartButton />}
          </div>

          {/* Кнопка меню для мобильных устройств */}
          <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </Container>

      {/* Мобильное меню */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} hasCart={hasCart} onSignIn={() => setOpenAuthModal(true)} />
    </header>
  );
};
