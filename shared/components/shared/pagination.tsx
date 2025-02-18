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
   // Логика для отображения 10 страниц
  const pageRange = 8;
  let startPage = Math.max(currentPage - Math.floor(pageRange / 2), 1); // Начало диапазона
  let endPage = startPage + pageRange - 1; // Конец диапазона

  // Если endPage больше, чем total pages, сдвигаем диапазон влево
  if (endPage > pageCount) {
    endPage = pageCount;
    startPage = Math.max(endPage - pageRange + 1, 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

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
      {currentPage > pageRange && (
        <Button
          className='text-md font-bold'
          variant="ghost"
          onClick={() => handlePageChange(1)}
        >
          1
        </Button>
      )}

      {currentPage > pageRange && <span className="text-gray-500 h-10 px-2 py-2">...</span>}

      {pages.map((page) => (
        <Button 
          className='text-md font-bold'
          key={page}
          variant={currentPage === page ? 'default' : 'ghost'}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}

      {currentPage < pageCount - pageRange && <span className="text-gray-500 h-10 px-2 py-2">...</span>}

      {currentPage < pageCount - pageRange && (
        <Button
          className='text-md font-bold'
          variant="ghost"
          onClick={() => handlePageChange(pageCount)}
        >
          {pageCount}
        </Button>
      )}
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