import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ProductsListing from './index';

vi.mock('../ProductCard', () => ({
  default: ({ product }) => (
    <div data-testid='product-card'>{product.name}</div>
  ),
}));

vi.mock('../ProductsSceleton', () => ({
  default: () => <div data-testid='products-skeleton'>Loading...</div>,
}));

describe('ProductsListing', () => {
  const mockHandleLoadMore = vi.fn();
  const products = [
    { id: 1, name: 'Test Product 1', category: 'Electronics', price: 99.99 },
    { id: 2, name: 'Test Product 2', category: 'Clothing', price: 49.99 },
  ];
  it('renders skeleton when loading', () => {
    render(
      <ProductsListing
        products={[]}
        isLoading={true}
        isFetching={false}
        handleLoadMore={mockHandleLoadMore}
        total={0}
      />
    );

    expect(screen.getByTestId('products-skeleton')).toBeInTheDocument();
  });

  it('renders product cards when products are present', () => {
    render(
      <ProductsListing
        products={products}
        isLoading={false}
        isFetching={false}
        handleLoadMore={mockHandleLoadMore}
        total={10}
      />
    );

    expect(screen.getAllByTestId('product-card')).toHaveLength(products.length);
  });

  it('shows "No products found" when product list is empty', () => {
    render(
      <ProductsListing
        products={[]}
        isLoading={false}
        isFetching={false}
        handleLoadMore={mockHandleLoadMore}
        total={0}
      />
    );

    expect(screen.getByText('No products found.')).toBeInTheDocument();
  });

  it('shows "You have reached the end of the list!" when all products loaded', () => {
    render(
      <ProductsListing
        products={products}
        isLoading={false}
        isFetching={false}
        handleLoadMore={mockHandleLoadMore}
        total={products.length}
      />
    );

    expect(
      screen.getByText("🎉 You've reached the end of the list!")
    ).toBeInTheDocument();
  });

  it('shows "Load More" button when more products available', () => {
    render(
      <ProductsListing
        products={products}
        isLoading={false}
        isFetching={false}
        handleLoadMore={mockHandleLoadMore}
        total={10}
      />
    );

    const loadMoreButton = screen.getByText('Load More');
    expect(loadMoreButton).toBeInTheDocument();
    fireEvent.click(loadMoreButton);
    expect(mockHandleLoadMore).toHaveBeenCalled();
  });
});
