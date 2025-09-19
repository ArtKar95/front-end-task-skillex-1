import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import FilterPanel from './index';

vi.mock('../../productsAPI', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetCategoriesQuery: () => ({
      data: ['Electronics', 'Clothing'],
      error: null,
    }),
    useGetBrandsQuery: () => ({ data: ['Brand A', 'Brand B'], error: null }),
  };
});

vi.mock('@/shared/hooks/useToast', () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock('@/shared/components/VirtualizedSelect', () => ({
  default: (props) => (
    <div data-testid={`virtualized-select-${props.placeholder}`}>
      VirtualizedSelect: {props.placeholder}
    </div>
  ),
}));

vi.mock('@/shared/components/DebouncesInput', () => ({
  default: (props) => (
    <input
      data-testid='debounced-input'
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
    />
  ),
}));

vi.mock('./PriceRangeSlider', () => ({
  default: () => <div data-testid='price-range-slider'>PriceRangeSlider</div>,
}));

vi.mock('./RatingFilter', () => ({
  default: () => <div data-testid='rating-filter'>RatingFilter</div>,
}));

describe('FilterPanel', () => {
  const mockFilters = {
    search: '',
    categories: [],
    brands: [],
    priceRange: { min: 0, max: 500 },
    rating: 0,
  };

  const mockHandleFiltersChange = vi.fn();
  const mockOnClose = vi.fn();

  it('renders FilterPanel correctly when open', () => {
    render(
      <FilterPanel
        filters={mockFilters}
        handleFiltersChange={mockHandleFiltersChange}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Filters')).toBeInTheDocument();

    expect(screen.getByText('✕')).toBeInTheDocument();

    expect(screen.getByTestId('debounced-input')).toBeInTheDocument();
    expect(
      screen.getByTestId('virtualized-select-Categories')
    ).toBeInTheDocument();
    expect(screen.getByTestId('virtualized-select-Brands')).toBeInTheDocument();
    expect(screen.getByTestId('price-range-slider')).toBeInTheDocument();
    expect(screen.getByTestId('rating-filter')).toBeInTheDocument();
  });

  it('renders FilterPanel as hidden when isOpen is false', () => {
    render(
      <FilterPanel
        filters={mockFilters}
        handleFiltersChange={mockHandleFiltersChange}
        isOpen={false}
        onClose={mockOnClose}
      />
    );

    const panel = screen.getByTestId('filter-panel-root');
    expect(panel).toHaveAttribute('aria-hidden', 'true');
  });
});
