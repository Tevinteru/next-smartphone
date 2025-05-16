import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { Header } from '@/shared/components/shared/header';

vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        name: 'John',
        role: 'ADMIN',
      },
    },
    status: 'authenticated',
  }),
}));

describe('Header', () => {
  it('рендерит лого и ссылки', () => {
    render(<Header hasCart={true} />);
    
    expect(screen.getAllByText(/смартфоны/i));
    expect(screen.getAllByText(/каталог/i));
    expect(screen.getAllByText(/контакты/i));
    expect(screen.getAllByText(/о нас/i));
    expect(screen.getAllByText(/админ-панель/i));
  });
});
