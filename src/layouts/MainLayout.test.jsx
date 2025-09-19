import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import MainLayout from './MainLayout';

test('renders header', () => {
  render(
    <MemoryRouter>
      <MainLayout />
    </MemoryRouter>
  );
  expect(screen.getByText('Products Catalog')).toBeInTheDocument();
});
