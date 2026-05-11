import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setUser, setIsAuthenticated, setLoading } from '../slices/usersSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/',
    credentials: 'include'
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => 'auth/getMe',
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
          dispatch(setIsAuthenticated(true));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: 'profile/update',
        method: 'PUT',
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.user) {
            dispatch(setUser(data.user));
          }
        } catch (error) {
          console.error('Update profile failed:', error);
        }
      },
      invalidatesTags: ['User'],
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: 'password/update',
        method: 'PUT',
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: 'password/forgot',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, body }) => ({
        url: `password/reset/${token}`,
        method: 'PUT',
        body,
      }),
    }),
    getUserDetails: builder.query({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserDetailsQuery,
} = userApi;
