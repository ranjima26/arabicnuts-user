import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query: (body) => ({
        url: 'orders/createOrder',
        method: 'POST',
        body,
      }),
    }),
    myOrders: builder.query({
      query: () => 'me/orders',
      providesTags: ['Order'],
    }),
    orderDetails: builder.query({
      query: (id) => `orders/${id}`,
      providesTags: ['Order'],
    }),
    stripeCheckoutSession: builder.mutation({
      query: (body) => ({
        url: 'payment/checkout_session',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useMyOrdersQuery,
  useOrderDetailsQuery,
  useStripeCheckoutSessionMutation,
} = orderApi;
