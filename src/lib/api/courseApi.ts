import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseAPI = createApi({
  reducerPath: "courseAPI",
  tagTypes: ["course"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: (params) => {
        return {
          url: `course`,
          method: "GET",
          params,
        };
      },
      providesTags: ["course"],
    }),
    getAllCourse: builder.query({
      query: (params) => {
        return {
          url: `course`,
          method: "GET",
          params,
        };
      },
      providesTags: ["course"],
    }),
    getCourseById: builder.query({
      query: (id) => {
        return {
          url: `course/${id}`,
          method: "GET",
        };
      },
      providesTags: ["course"],
    }),
    addCourse: builder.mutation({
      query: (obj) => {
        return {
          url: `course/register`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["course"],
    }),
    updateCourse: builder.mutation({
      query: ({ updateCourse, id }) => {
        return {
          url: `/course/update/${id}`,
          method: "PUT",
          body: updateCourse,
        };
      },
      invalidatesTags: ["course"],
    }),
    deleteCourse: builder.mutation({
      query: (id) => {
        return {
          url: `/course/delete/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useGetCourseQuery,
  useGetCourseByIdQuery,
  useAddCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useGetAllCourseQuery,
} = courseAPI;
