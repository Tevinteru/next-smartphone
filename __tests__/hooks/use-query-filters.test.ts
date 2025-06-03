import { renderHook } from '@testing-library/react';
import { useQueryFilters } from '@/shared/hooks/use-query-filters';
import { vi } from 'vitest';

const push = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('qs', () => ({
  stringify: vi.fn((params) => {
    if (params.sort) {
      return `sort=${params.sort}`;
    }
    return '';
  }),
  default: {
    stringify: vi.fn((params) => {
      if (params.sort) {
        return `sort=${params.sort}`;
      }
      return '';
    }),
  },
}));

describe('useQueryFilters', () => {
  beforeEach(() => {
    push.mockClear();
  });

  it('вызывает router.push при изменении фильтров (не при первом рендеринге)', () => {
    const filters = {
      ram: new Set(['8']),
      storage: new Set([]),
      selectedBrands: new Set(['apple']),
      prices: { priceFrom: 100, priceTo: 1000 },
      sort: 'price_asc',
    };

    const { rerender } = renderHook(
      ({ filters, isResetting }) => useQueryFilters(filters, isResetting),
      {
        initialProps: { filters, isResetting: false },
      }
    );

    rerender({ filters: { ...filters, sort: 'name' }, isResetting: false });

    expect(push).toHaveBeenCalledWith('?sort=name', { scroll: false });
  });
});