import { cn } from '@/shared/lib/utils';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from './container';
import { Button } from '../ui';
import { User } from 'lucide-react';
import { CartButton } from './cart-button';
interface Props{
    hasCart?: boolean;
    className?: string;
}

export const Header: React.FC<Props> = ({ className, hasCart = true }) => {
    return (
        <header className={cn('border-b', className)}>
            <Container className='flex items-center justify-between py-8'>
                <Link href='/'>
                    <div className="flex items-center gap-3">
                        <Image src="/logo.png" width={45} height={45} alt="Logo" />
                        <div>
                        <h1 className="text-2xl uppercase font-black">Смартфоны</h1>
                        </div>
                    </div>
                </Link>
                <div className="flex items-center gap-3">
                    <Button variant='outline' className='flex items-center gap-3'>
                        <User size={16} />
                        Войти
                    </Button>
                    {hasCart && <CartButton />}
                </div>
            </Container>
        </header>
    )
}