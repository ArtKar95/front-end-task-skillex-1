import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductsCatalog from './index';

//! I probably should create a separate global __mock__, but I saw too late that the tests are required
//! But i worked with Jest and in BE side with Nest js and in Fe side with React

vi.mock('@/features/ProductsCatalog/productsAPI', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetProductsQuery: () => ({
      data: { products: [], total: 0 },
      isLoading: false,
      isFetching: false,
      error: null,
    }),
    useGetCategoriesQuery: () => ({ data: [], error: null, isLoading: false }),
    useGetBrandsQuery: () => ({ data: [], error: null, isLoading: false }),
  };
});

vi.mock('@/shared/hooks/useToast', () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock('@/shared/hooks/useLocalStorage', () => ({
  useLocalStorage: () => [
    {
      filters: { category: [], priceRange: { min: 0, max: 500 } },
      sortOption: 'price-asc',
      limit: 10,
    },
    vi.fn(),
  ],
}));

vi.mock('./components/ProductsListing', () => ({
  default: () => <div data-testid='products-listing'>Products Listing</div>,
}));

vi.mock('./components/FilterPanel', () => ({
  default: () => <div data-testid='filter-panel'>Filter Panel</div>,
}));

vi.mock('./components/SortOptions', () => ({
  default: () => <div data-testid='sort-options'>Sort Options</div>,
}));

describe('ProductsCatalog', () => {
  it('renders ProductsCatalog with header, filter panel, and products list', () => {
    render(<ProductsCatalog />);

    expect(screen.getByText('0 product found')).toBeInTheDocument();

    expect(screen.getByTestId('sort-options')).toBeInTheDocument();
    expect(screen.getByTestId('filter-panel')).toBeInTheDocument();
    expect(screen.getByTestId('products-listing')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /open filters/i })
    ).toBeInTheDocument();
  });
});
