import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PriceRangeSlider from './index';

vi.mock('@/features/ProductsCatalog/productsAPI', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetPriceRangeQuery: () => ({ data: { min: 0, max: 500 }, error: null }),
  };
});

vi.mock('@/shared/hooks/useToast', () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock('@/shared/hooks/useDebouncedCallback', () => ({
  default: (fn) => fn,
}));

describe('PriceRangeSlider', () => {
  const mockOnChange = vi.fn();
  const defaultRange = { min: 50, max: 400 };

  it('renders PriceRangeSlider correctly', () => {
    render(
      <PriceRangeSlider defaultRange={defaultRange} onChange={mockOnChange} />
    );
    expect(screen.getByText('Price Range')).toBeInTheDocument();
  });
});
