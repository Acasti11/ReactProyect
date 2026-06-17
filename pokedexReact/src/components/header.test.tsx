/// <reference types="vitest/globals" />

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { vi } from 'vitest';
import { Header } from './header';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');

  return {
    ...actual,
    NavLink: ({ to, children }: { to: string; children: ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  };
});

describe('Header', () => {
  it('renders the main navigation links', () => {
    render(<Header />);

    const pokedexLinks = screen.getAllByRole('link', { name: 'Pokedex' });
    expect(pokedexLinks.some((link) => link.getAttribute('href') === '/pokedex')).toBe(true);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Dream Team' })).toBeInTheDocument();
  });
});
