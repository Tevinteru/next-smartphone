'use client';

import { cn } from "@/shared/lib/utils";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";
import { CartButton } from "./cart-button";
import { AuthModal } from "./modals";
import { ProfileButton } from "./profile-button";

interface Props {
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ className, hasCart = true }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8 md:flex-col md:items-center">
        {/* Левая часть */}
        <Link href="/">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" width={45} height={45} alt="Logo" />
            <div>
              <h1 className="text-2xl uppercase font-black">Смартфоны</h1>
            </div>
          </div>
        </Link>

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
