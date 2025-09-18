import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import products from '@/mockData/products.json';
import { filterProducts, simulateFetch } from './helpers';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      queryFn: async (filters) => {
        const filtered = filterProducts(products, filters);
        await simulateFetch();
        return {
          data: {
            products: filtered.slice(0, filters.limit),
            total: filtered.length,
          },
        };
      },
    }),

    getCategories: builder.query({
      queryFn: async () => {
        await simulateFetch();
        return { data: [...new Set(products.map((p) => p.category))].sort() };
      },
    }),

    getBrands: builder.query({
      queryFn: async () => {
        await simulateFetch();
        return { data: [...new Set(products.map((p) => p.brand))].sort() };
      },
    }),

    getPriceRange: builder.query({
      queryFn: async () => {
        await simulateFetch();
        const prices = products.map(({ price }) => price);
        return { data: { min: Math.min(...prices), max: Math.max(...prices) } };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetBrandsQuery,
  useGetPriceRangeQuery,
} = productsApi;
