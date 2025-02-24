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
  pageRange?: number;
}

export const Pagination: React.FC<Props> = ({ className, currentPage = 1, pageCount = 1, pageRange = 5 }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Function to update the page
  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page.toString());
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  // Logic for displaying pages
  const visiblePages = React.useMemo(() => {
    let startPage = Math.max(currentPage - Math.floor(pageRange / 2), 1);
    let endPage = startPage + pageRange - 1;

    
    if (endPage > pageCount) {
      endPage = pageCount;
      startPage = Math.max(endPage - pageRange + 1, 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [currentPage, pageCount, pageRange]);

  const showEllipsisStart = visiblePages[0] > 1;
  const showEllipsisEnd = visiblePages[visiblePages.length - 1] < pageCount;

  return (
    <div className={cn('flex items-center justify-center gap-1', className)}>
      {/* "Previous" Button */}
      <Button
        className="p-0 w-8 md:w-10 disabled:bg-white disabled:opacity-20"
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Buttons */}
      <div className="flex gap-1 md:gap-2 mx-1 md:mx-2"> {/* Adjusted margins */}
        {showEllipsisStart && (
          <>
            <Button
              className='text-sm md:text-md font-bold'
              variant="ghost"
              onClick={() => handlePageChange(1)}
            >
              1
            </Button>
            <span className="text-gray-500 h-8 md:h-10 px-1 md:px-2 py-2">...</span>
          </>
        )}

        {visiblePages.map((page) => (
          <Button
            className='text-sm md:text-md font-bold'
            key={page}
            variant={currentPage === page ? 'default' : 'ghost'}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}

        {showEllipsisEnd && (
          <>
            <span className="text-gray-500 h-8 md:h-10 px-1 md:px-2 py-2">...</span>
            <Button
              className='text-sm md:text-md font-bold'
              variant="ghost"
              onClick={() => handlePageChange(pageCount)}
            >
              {pageCount}
            </Button>
          </>
        )}
      </div>

      {/* "Next" Button */}
      <Button
        className="p-0 w-8 md:w-10 disabled:bg-white disabled:opacity-20" // Smaller on small screens
        variant="outline"
        disabled={currentPage === pageCount}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ChevronLeft className="h-4 w-4 rotate-180" />
      </Button>
    </div>
  );
};