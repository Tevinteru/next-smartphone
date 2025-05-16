import { renderHook } from '@testing-library/react';
import { useQueryFilters } from '@/shared/hooks/use-query-filters';
import { vi } from 'vitest';

const push = vi.fn(); // сохраняем функцию push в переменную

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }), // используем сохранённый push
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('qs', async () => {
  const actual = await vi.importActual<typeof import('qs')>('qs');
  return {
    ...actual,
    default: actual,
    stringify: vi.fn(() => 'sort=price_asc'),
  };
});

describe('useQueryFilters', () => {
  beforeEach(() => {
    push.mockClear(); // очищаем push перед каждым тестом
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

    expect(push).toHaveBeenCalledWith('?sort=price_asc', { scroll: false });
  });
});
