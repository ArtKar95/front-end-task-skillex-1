import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import products from '@/mockData/products.json';

//!I wrote this delay function to simulate fetch
const simulateFetch = async (data, delay = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      queryFn: async () => {
        const data = await simulateFetch(products);
        return { data };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
