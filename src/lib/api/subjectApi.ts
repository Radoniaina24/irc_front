import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const subjectAPI = createApi({
  reducerPath: "subjectAPI",
  tagTypes: ["subject"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getSubject: builder.query({
      query: (params) => {
        return {
          url: `subject`,
          method: "GET",
          params,
        };
      },
      providesTags: ["subject"],
    }),
    getAllSubject: builder.query({
      query: (params) => {
        return {
          url: `subject`,
          method: "GET",
          params,
        };
      },
      providesTags: ["subject"],
    }),
    getSubjectById: builder.query({
      query: (id) => {
        return {
          url: `subject/${id}`,
          method: "GET",
        };
      },
      providesTags: ["subject"],
    }),
    addSubject: builder.mutation({
      query: (obj) => {
        return {
          url: `subject/register`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["subject"],
    }),
    updateSubject: builder.mutation({
      query: ({ updateSubject, id }) => {
        return {
          url: `/subject/update/${id}`,
          method: "PUT",
          body: updateSubject,
        };
      },
      invalidatesTags: ["subject"],
    }),
    deleteSubject: builder.mutation({
      query: (id) => {
        return {
          url: `/subject/delete/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["subject"],
    }),
  }),
});

export const {
  useGetSubjectQuery,
  useGetSubjectByIdQuery,
  useAddSubjectMutation,
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,
  useGetAllSubjectQuery,
} = subjectAPI;
