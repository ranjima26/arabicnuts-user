import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: 'products',
        params: {
          page: params?.page,
          keyword: params?.keyword,
          category: params?.category,
          limit: params?.limit,
          "price[gte]": params?.min,
          "price[lte]": params?.max,
          "ratings[gte]": params?.ratings,
        },
      }),
      providesTags: ['Product'],
    }),
    getProductDetails: builder.query({
      query: (id) => `products/${id}`,
      providesTags: ['Product'],
    }),
    submitReview: builder.mutation({
      query: (body) => ({
        url: 'reviews',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useSubmitReviewMutation,
} = productApi;
