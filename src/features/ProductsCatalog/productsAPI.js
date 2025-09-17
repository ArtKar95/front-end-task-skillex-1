import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import products from '@/mockData/products.json';

//!I wrote this delay function to simulate fetch
const simulateFetch = async (delay = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(), delay));

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      queryFn: async ({ limit } = {}) => {
        const prices = products.map((p) => p.price);
        const dataSlice = products.slice(0, limit);
        await simulateFetch();
        return {
          data: {
            products: dataSlice,
            total: products.length,
            //! Better to have categories, brands and price range in separate endpoints but as it's mock data i just put it here
            categories: [...new Set(products.map((p) => p.category))].sort(),
            brands: [...new Set(products.map((p) => p.brand))].sort(),
            priceRange: {
              min: Math.min(...prices),
              max: Math.max(...prices),
            },
          },
        };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;

