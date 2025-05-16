'use client';

import Link from 'next/link';
import { Container } from './index';
import Image from 'next/image';
import { Title } from './title';

export const Footer = () => {
  return (
    <footer className="border-t bg-zinc-900 py-8 text-gray-300">
      <Container className="grid grid-cols-3 md:grid-cols-4 gap-4 px-2 md:px-4">
        {/* О компании */}
        <div>
          <h3 className="text-lg font-semibold mb-4">О компании</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">О нас</Link></li>
            <li><Link href="/" className="hover:text-white">Карьера</Link></li>
            <li><Link href="/" className="hover:text-white">Новости</Link></li>
          </ul>
        </div>

        {/* Поддержка */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Поддержка</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact" className="hover:text-white">Связаться с нами</Link></li>
            <li><Link href="/" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/" className="hover:text-white">Гарантия и возврат</Link></li>
          </ul>
        </div>

        {/* Полезное */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Полезное</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/catalog" className="hover:text-white">Каталог</Link></li>
            <li><Link href="/" className="hover:text-white">Блог</Link></li>
            <li><Link href="/" className="hover:text-white">Партнёрам</Link></li>
          </ul>
        </div>
        <div className='mx-auto my-auto'>
         <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" width={40} height={40} alt="Logo" />
          <Title text="Смартфоны" size="md" className="font-bold uppercase" />
        </Link>
        </div>
      </Container>

      {/* Низ футера */}
      <div className="mt-8 border-t border-zinc-700 pt-4 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Смартфоны. Все права защищены.
      </div>
    </footer>
  );
};
