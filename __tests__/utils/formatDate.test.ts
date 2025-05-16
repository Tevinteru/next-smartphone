import { describe, it, expect } from 'vitest';
import { formatDate } from '@/shared/lib/utils';

describe('formatDate', () => {
  it('Должен правильно форматировать дату под русский язык', () => {
    const result = formatDate(new Date('2024-01-01T10:30:00'));
    expect(result).toMatch(/1 января 2024.*10:30/);
  });

  it('Должен принимать строковую дату', () => {
    const result = formatDate('2024-05-13T22:15:00');
    expect(result).toMatch(/13 мая 2024.*22:15/);
  });
});
