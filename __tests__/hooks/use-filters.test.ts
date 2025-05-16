import { renderHook, act } from '@testing-library/react';
import { useFilters } from '@/shared/hooks/use-filters';
import { vi } from 'vitest';

const push = vi.fn();
const mockSearchParams = new URLSearchParams({
  ram: '8,16',
  brands: 'apple',
});

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => mockSearchParams,
}));

describe('useFilters', () => {
  beforeEach(() => push.mockClear());

  it('Воращает корректный начальный URL', () => {
    const { result } = renderHook(() => useFilters());

    expect(Array.from(result.current.ram)).toEqual(['8', '16']);
    expect(Array.from(result.current.selectedBrands)).toEqual(['apple']);
  });

  it('Обновляет параметры сортировки', () => {
    const { result } = renderHook(() => useFilters());
    act(() => {
      result.current.setSort('price');
    });
    expect(push).toHaveBeenCalledWith(expect.stringContaining('sort=price'), { scroll: false });
  });
});
