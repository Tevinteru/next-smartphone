import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useOrders } from '@/shared/hooks/use-orders';

global.fetch = vi.fn();

const mockOrders = [
  {
    id: 1,
    status: 'PENDING',
    totalAmount: 100,
    createdAt: new Date(),
    items: '[]',
  }
];

describe('useOrders', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Получает заказы и возращает данные', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockOrders,
    });

    const { result } = renderHook(() => useOrders(1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.orders).toEqual(mockOrders);
    expect(result.current.error).toBeNull();
  });

  it('sets error if fetch fails', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useOrders(1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Ошибка при загрузке заказов');
  });
});
