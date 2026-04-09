import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://register.cseconference.org',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/Auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getCategories: builder.query({
      query: () => '/api/Categories',
    }),
    getCourses: builder.query({
      query: () => '/api/Courses',
    }),
  }),
});

export const { useLoginMutation, useGetCategoriesQuery, useGetCoursesQuery } = apiSlice;