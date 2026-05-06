import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const couponApi = createApi({
  reducerPath: 'couponApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/coupons' }),
  endpoints: (builder) => ({
    getCoupons: builder.query({ query: () => '' }),
    applyCoupon: builder.mutation({
      query: (code) => ({
        url: 'apply',
        method: 'POST',
        body: { code },
      }),
    }),
  }),
});

export const { useGetCouponsQuery, useApplyCouponMutation } = couponApi;
