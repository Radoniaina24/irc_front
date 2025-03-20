import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const categoryAPI = createApi({
  reducerPath: "categoryAPI",
  tagTypes: ["category"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: (params) => {
        return {
          url: `category`,
          method: "GET",
          params,
        };
      },
      providesTags: ["category"],
    }),
    getAllCategory: builder.query({
      query: (params) => {
        return {
          url: `category`,
          method: "GET",
          params,
        };
      },
      providesTags: ["category"],
    }),
    getCategoryById: builder.query({
      query: (id) => {
        return {
          url: `category/${id}`,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),
    addCategory: builder.mutation({
      query: (obj) => {
        return {
          url: `category`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ name, id, sector }) => {
        return {
          url: `/category/${id}`,
          method: "PUT",
          body: { sector, name },
        };
      },
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/category/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllCategoryQuery,
} = categoryAPI;
