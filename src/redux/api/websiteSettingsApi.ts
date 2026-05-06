import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const websiteSettingsApi = createApi({
  reducerPath: 'websiteSettingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/website-settings' }),
  endpoints: (builder) => ({
    getSettings: builder.query({ query: () => '' }),
    updateSettings: builder.mutation({
      query: (settings) => ({
        url: '',
        method: 'PUT',
        body: settings,
      }),
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = websiteSettingsApi;
