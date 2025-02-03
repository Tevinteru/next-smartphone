'use client';

import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface Props {
  className?: string;
  currentPage?: number;
  pageCount?: number;
}

export const Pagination: React.FC<Props> = ({ className, currentPage = 1, pageCount = 1 }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Функция для обновления страницы
  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page.toString());
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {/* Кнопка "Назад" */}
      <Button
        className="p-0 w-10 disabled:bg-white disabled:opacity-20"
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Кнопки страниц */}
      <div className="flex gap-1 mx-2">
        {[...Array(pageCount)].map((_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? 'default' : 'ghost'}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>

      {/* Кнопка "Вперед" */}
      <Button
        className="p-0 w-10 disabled:bg-white disabled:opacity-20"
        variant="outline"
        disabled={currentPage === pageCount}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ChevronLeft className="h-4 w-4 rotate-180" />
      </Button>
    </div>
  );
};