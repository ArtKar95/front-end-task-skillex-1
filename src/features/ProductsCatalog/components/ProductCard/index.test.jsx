import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ProductCard from './index';

vi.mock('react-simple-star-rating', () => ({
  Rating: (props) => (
    <div data-testid='rating'>Rating: {props.initialValue}</div>
  ),
}));

describe('ProductCard', () => {
  const product = {
    name: 'Test Product',
    brand: 'Brand A',
    category: 'Electronics',
    price: 123.45,
    rating: 4.5,
    imageUrl: 'https://example.com/image.jpg',
  };

  it('renders product card with all elements', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByTestId('product-card')).toBeInTheDocument();

    expect(screen.getByAltText(product.name)).toHaveAttribute(
      'src',
      product.imageUrl
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.brand)).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();

    expect(screen.getByTestId('rating')).toBeInTheDocument();
    expect(screen.getByText(`(${product.rating})`)).toBeInTheDocument();

    expect(
      screen.getByText(`$${product.price.toFixed(2)}`)
    ).toBeInTheDocument();

    expect(screen.getByText('Add to Cart')).toBeDisabled();
    expect(screen.getByText('Quick View')).toBeInTheDocument();
  });
});
