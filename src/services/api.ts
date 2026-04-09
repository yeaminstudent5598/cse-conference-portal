import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://register.cseconference.org',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      // ✅ টোকেন থেকে সব ধরণের কোটেশন এবং 'Bearer' প্রিফিক্স ক্লিন করা হচ্ছে
      const cleanToken = token.replace(/["']/g, '').replace(/Bearer /gi, '').trim();
      headers.set('Authorization', `Bearer ${cleanToken}`);
    }
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWith401Handler = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  const url = typeof args === 'string' ? args : args?.url || '';
  const isLoginRequest = url.includes('/api/Auth/login');

  // ✅ যদি ৪০১ এরর আসে এবং সেটা লগিন রিকোয়েস্ট না হয়, তবেই লগআউট করবে
  if (result.error && result.error.status === 401 && !isLoginRequest) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWith401Handler,
  tagTypes: ['Category', 'Course', 'Enrollment', 'Role', 'User'],
  endpoints: (builder) => ({
    // AUTH
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: '/api/Auth/login',
        method: 'POST',
        body: credentials,
        responseHandler: async (response) => {
          const text = await response.text();
          try { return JSON.parse(text); } catch { return text; }
        },
      }),
    }),
    register: builder.mutation<any, any>({
      query: (userData) => ({ url: '/api/Auth/register', method: 'POST', body: userData }),
    }),

    // CATEGORIES
    getCategories: builder.query<any[], void>({
      query: () => '/api/Categories',
      providesTags: ['Category'],
      transformResponse: (response: any) => Array.isArray(response) ? response : [],
    }),
    addCategory: builder.mutation<any, any>({
      query: (body) => ({ url: '/api/Categories', method: 'POST', body }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => ({ url: `/api/Categories/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation<any, number>({
      query: (id) => ({ url: `/api/Categories/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Category'],
    }),

    // COURSES
    getCourses: builder.query<any[], void>({
      query: () => '/api/Courses',
      providesTags: ['Course'],
      transformResponse: (response: any) => Array.isArray(response) ? response : [],
    }),
    addCourse: builder.mutation<any, any>({
      query: (body) => ({ url: '/api/Courses', method: 'POST', body }),
      invalidatesTags: ['Course'],
    }),
    updateCourse: builder.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => ({ url: `/api/Courses/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Course'],
    }),
    deleteCourse: builder.mutation<any, number>({
      query: (id) => ({ url: `/api/Courses/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Course'],
    }),

    // ENROLLMENTS
    getEnrollments: builder.query<any[], void>({
      query: () => '/api/Enrollments',
      providesTags: ['Enrollment'],
      transformResponse: (response: any) => Array.isArray(response) ? response : [],
    }),
    addEnrollment: builder.mutation<any, any>({
      query: (body) => ({ url: '/api/Enrollments', method: 'POST', body }),
      invalidatesTags: ['Enrollment'],
    }),

    // ROLES
    getRoles: builder.query<any[], void>({
      query: () => '/api/Roles',
      providesTags: ['Role'],
      transformResponse: (response: any) => Array.isArray(response) ? response : [],
    }),
    addRole: builder.mutation<any, any>({
      query: (body) => ({ url: '/api/Roles', method: 'POST', body }),
      invalidatesTags: ['Role'],
    }),

    // USERS
    getUsers: builder.query<any[], void>({
      query: () => '/api/Users',
      providesTags: ['User'],
      transformResponse: (response: any) => Array.isArray(response) ? response : [],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCoursesQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetEnrollmentsQuery,
  useAddEnrollmentMutation,
  useGetRolesQuery,
  useAddRoleMutation,
  useGetUsersQuery,
} = api;