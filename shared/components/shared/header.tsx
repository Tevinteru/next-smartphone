'use client';

import { cn } from "@/shared/lib/utils";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container,CartButton, AuthModal, ProfileButton, Title }  from "./index"
import { Button } from "@/shared/components/ui/button";
import { Menu } from "lucide-react"; 

interface Props {
    hasCart?: boolean;
    className?: string;
}

export const Header: React.FC<Props> = ({ className, hasCart = true }) => {
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className={cn("border-b", className)}>
            <Container className="flex items-center justify-between py-3 md:py-4 px-2 md:px-4">
                {/* Left Section: Logo and Title */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <Image src="/logo.png" width={40} height={40} alt="Logo" />
                    <Title text="Смартфоны" size="md" className="font-bold uppercase" />
                </Link>

                {/* Right Section: Auth, Profile, Cart, Mobile Menu */}
                <div className="flex items-center space-x-2 md:space-x-3">
                    {/* Standard buttons shown on larger screens */}
                    <div className="hidden md:flex items-center space-x-2">
                        <AuthModal
                            open={openAuthModal}
                            onClose={() => setOpenAuthModal(false)}
                        />
                        <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
                        {hasCart && <CartButton />}
                    </div>

                    {/* Mobile menu button, visible only on smaller screens */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                {/* Mobile Menu (Conditionally Rendered) */}
                {isMobileMenuOpen && (
                    <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 overflow-y-auto">
                        <div className="p-4">
                            <div className="flex justify-end">
                                <Button variant="ghost" onClick={() => setIsMobileMenuOpen(false)}>
                                    Закрыть
                                </Button>
                            </div>
                            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
                            {hasCart && <CartButton />}
                            {/* Add other mobile menu items here */}
                            <Link href="/products" className="block py-2">Продукты</Link>
                            <Link href="/about" className="block py-2">О нас</Link>
                        </div>
                    </div>
                )}
            </Container>
        </header>
    );
};