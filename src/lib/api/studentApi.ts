import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentAPI = createApi({
  reducerPath: "studentAPI",
  tagTypes: ["student"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getStudent: builder.query({
      query: (params) => {
        return {
          url: `student`,
          method: "GET",
          params,
        };
      },
      providesTags: ["student"],
    }),
    getAllStudent: builder.query({
      query: (params) => {
        return {
          url: `student`,
          method: "GET",
          params,
        };
      },
      providesTags: ["student"],
    }),
    getStudentById: builder.query({
      query: (id) => {
        return {
          url: `student/${id}`,
          method: "GET",
        };
      },
      providesTags: ["student"],
    }),
    addStudent: builder.mutation({
      query: (obj) => {
        return {
          url: `student/register`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["student"],
    }),
    updateStudent: builder.mutation({
      query: ({ updateStudent, id }) => {
        return {
          url: `/student/update/${id}`,
          method: "PUT",
          body: updateStudent,
        };
      },
      invalidatesTags: ["student"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => {
        return {
          url: `/student/delete/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["student"],
    }),
  }),
});

export const {
  useGetStudentQuery,
  useGetStudentByIdQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
  useGetAllStudentQuery,
} = studentAPI;
