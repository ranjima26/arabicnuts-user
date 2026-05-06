import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const enquiryApi = createApi({
  reducerPath: 'enquiryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/enquiries' }),
  endpoints: (builder) => ({
    getEnquiries: builder.query({ query: () => '' }),
    createEnquiry: builder.mutation({
      query: (enquiry) => ({
        url: '',
        method: 'POST',
        body: enquiry,
      }),
    }),
  }),
});

export const { useGetEnquiriesQuery, useCreateEnquiryMutation } = enquiryApi;
