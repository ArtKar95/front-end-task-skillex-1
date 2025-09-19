import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './productsAPI';
import { beforeEach, describe, expect, it } from 'vitest';

describe('productsApi endpoints', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
    });
  });

  it('getProducts returns filtered and sorted products', async () => {
    const action = productsApi.endpoints.getProducts.initiate({
      filters: { search: '', categories: [], brands: [] },
      limit: 5,
      sortOption: 'price-asc',
    });

    const result = await store.dispatch(action).unwrap();

    expect(result.products).toHaveLength(5);
    expect(result.products[0].price).toBeLessThanOrEqual(
      result.products[1].price
    );
  });

  it('getCategories returns all categories', async () => {
    const action = productsApi.endpoints.getCategories.initiate();
    const result = await store.dispatch(action).unwrap();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('getBrands returns all brands', async () => {
    const action = productsApi.endpoints.getBrands.initiate();
    const result = await store.dispatch(action).unwrap();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('getPriceRange returns min and max prices', async () => {
    const action = productsApi.endpoints.getPriceRange.initiate();
    const result = await store.dispatch(action).unwrap();
    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(result.min).toBeLessThanOrEqual(result.max);
  });
});
