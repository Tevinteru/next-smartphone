import { renderHook, waitFor } from '@testing-library/react';
import { useBrands } from '@/shared/hooks/use-brands';
import { vi } from 'vitest';

vi.mock('@/shared/services/api-client', () => ({
  Api: {
    brands: {
      getAll: vi.fn().mockResolvedValue([
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Samsung' },
      ]),
    },
  },
}));

describe('useBrands', () => {
  it('Правильно получает и устанавливает Бренды', async () => {
    const { result } = renderHook(() => useBrands());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.brands).toEqual([
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Samsung' },
    ]);
  });
});