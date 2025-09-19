import { describe, it, expect } from 'vitest';
import { simulateFetch, filterProducts, sortProducts } from './helpers';

describe('products catalog helpers', () => {
  describe('simulateFetch', () => {
    it('resolves after the given delay', async () => {
      const start = Date.now();
      await simulateFetch(100);
      const duration = Date.now() - start;
      expect(duration).toBeGreaterThanOrEqual(100);
    });
  });

  describe('filterProducts', () => {
    const products = [
      {
        name: 'Phone',
        category: 'Electronics',
        brand: 'Brand A',
        price: 100,
        rating: 5,
      },
      {
        name: 'Laptop',
        category: 'Electronics',
        brand: 'Brand B',
        price: 500,
        rating: 4,
      },
      {
        name: 'Shirt',
        category: 'Clothing',
        brand: 'Brand A',
        price: 20,
        rating: 3,
      },
    ];

    it('returns all products if no filters', () => {
      expect(filterProducts(products)).toHaveLength(3);
    });

    it('filters by search', () => {
      expect(filterProducts(products, { search: 'phone' })).toEqual([
        {
          name: 'Phone',
          category: 'Electronics',
          brand: 'Brand A',
          price: 100,
          rating: 5,
        },
      ]);
    });

    it('filters by category', () => {
      expect(filterProducts(products, { categories: ['Clothing'] })).toEqual([
        {
          name: 'Shirt',
          category: 'Clothing',
          brand: 'Brand A',
          price: 20,
          rating: 3,
        },
      ]);
    });

    it('filters by brand', () => {
      expect(filterProducts(products, { brands: ['Brand B'] })).toEqual([
        {
          name: 'Laptop',
          category: 'Electronics',
          brand: 'Brand B',
          price: 500,
          rating: 4,
        },
      ]);
    });

    it('filters by price range', () => {
      expect(
        filterProducts(products, { priceRange: { min: 50, max: 200 } })
      ).toEqual([
        {
          name: 'Phone',
          category: 'Electronics',
          brand: 'Brand A',
          price: 100,
          rating: 5,
        },
      ]);
    });

    it('filters by rating', () => {
      expect(filterProducts(products, { rating: 4 })).toEqual([
        {
          name: 'Phone',
          category: 'Electronics',
          brand: 'Brand A',
          price: 100,
          rating: 5,
        },
        {
          name: 'Laptop',
          category: 'Electronics',
          brand: 'Brand B',
          price: 500,
          rating: 4,
        },
      ]);
    });
  });

  describe('sortProducts', () => {
    const products = [
      { name: 'Phone', price: 100, rating: 5 },
      { name: 'Laptop', price: 500, rating: 4 },
      { name: 'Shirt', price: 20, rating: 3 },
    ];

    it('sorts by name ascending', () => {
      expect(
        sortProducts([...products], 'name-asc').map((p) => p.name)
      ).toEqual(['Laptop', 'Phone', 'Shirt']);
    });

    it('sorts by name descending', () => {
      expect(
        sortProducts([...products], 'name-desc').map((p) => p.name)
      ).toEqual(['Shirt', 'Phone', 'Laptop']);
    });

    it('sorts by price ascending', () => {
      expect(
        sortProducts([...products], 'price-asc').map((p) => p.price)
      ).toEqual([20, 100, 500]);
    });

    it('sorts by price descending', () => {
      expect(
        sortProducts([...products], 'price-desc').map((p) => p.price)
      ).toEqual([500, 100, 20]);
    });

    it('sorts by rating descending', () => {
      expect(
        sortProducts([...products], 'rating-desc').map((p) => p.rating)
      ).toEqual([5, 4, 3]);
    });
  });
});
