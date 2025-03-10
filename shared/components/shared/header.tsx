'use client';

import { cn } from "@/shared/lib/utils";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container,CartButton, AuthModal, ProfileButton, Title }  from "./index"
import { ShoppingBag, Info, SquareUserRound } from 'lucide-react';
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
            <Container className="flex items-center justify-between py-6 md:py-6 px-2 md:px-4">
                  {/* Left Section: Logo, Title, and Links */}
                  <div className="flex items-center gap-[90px]">
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <Image src="/logo.png" width={40} height={40} alt="Logo" />
                        <Title text="Смартфоны" size="md" className="font-bold uppercase" />
                    </Link>

                    {/* Links to About and Contact */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/catalog" className="flex items-center gap-2 text-lg text-gray-700 hover:text-primary transition-colors">
                            <ShoppingBag size={18}/>
                            Каталог
                        </Link>
                        <Link href="/contact" className="flex items-center gap-2 text-lg text-gray-700 hover:text-primary transition-colors">
                            <Info size={18}/>
                            Контакты
                        </Link>
                        <Link href="/about" className="flex items-center gap-2 text-lg text-gray-700 hover:text-primary transition-colors">
                            <SquareUserRound size={18}/>
                            О нас
                        </Link>
                    </div>
                </div>

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
                    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50">
                        <div className="bg-white w-4/5 sm:w-1/2 h-full p-6 rounded-l-3xl shadow-xl transform transition-transform ease-in-out duration-300">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800">Меню</h2>
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-gray-500 hover:text-gray-800 transition-colors duration-300"
                                >
                                    Закрыть
                                </Button>
                            </div>
                            {/* Profile button and Cart button with margin between them */}
                            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
                            {hasCart && <CartButton className="mt-2" />} {/* Add margin-left here for spacing */}
                            <div className="mt-4 space-y-2">
                                <Link
                                    href="/catalog"
                                    className="block text-lg font-medium text-gray-800 hover:text-primary transition-colors duration-300 py-2"
                                >
                                    Каталог
                                </Link>
                                <Link
                                    href="/contacts"
                                    className="block text-lg font-medium text-gray-800 hover:text-primary transition-colors duration-300 py-2"
                                >
                                    Контакты
                                </Link>
                                <Link
                                    href="/about"
                                    className="block text-lg font-medium text-gray-800 hover:text-primary transition-colors duration-300 py-2"
                                >
                                    О нас
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </header>
    );
};