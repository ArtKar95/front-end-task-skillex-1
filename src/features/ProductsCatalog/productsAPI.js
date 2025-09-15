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
        const dataSlice = products.slice(0, limit);
        await simulateFetch();
        return { data: { products: dataSlice, total: products.length } };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
