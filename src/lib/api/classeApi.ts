import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const classeAPI = createApi({
  reducerPath: "classeAPI",
  tagTypes: ["classe"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getClasse: builder.query({
      query: (params) => {
        return {
          url: `class`,
          method: "GET",
          params,
        };
      },
      providesTags: ["classe"],
    }),
    getAllClasse: builder.query({
      query: (params) => {
        return {
          url: `class`,
          method: "GET",
          params,
        };
      },
      providesTags: ["classe"],
    }),
    getClasseById: builder.query({
      query: (id) => {
        return {
          url: `class/${id}`,
          method: "GET",
        };
      },
      providesTags: ["classe"],
    }),
    addClasse: builder.mutation({
      query: (obj) => {
        return {
          url: `class/register`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["classe"],
    }),
    updateClasse: builder.mutation({
      query: ({ updateClasse, id }) => {
        return {
          url: `/class/update/${id}`,
          method: "PUT",
          body: updateClasse,
        };
      },
      invalidatesTags: ["classe"],
    }),
    deleteClasse: builder.mutation({
      query: (id) => {
        return {
          url: `/class/delete/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["classe"],
    }),
  }),
});

export const {
  useGetClasseQuery,
  useGetClasseByIdQuery,
  useAddClasseMutation,
  useDeleteClasseMutation,
  useUpdateClasseMutation,
  useGetAllClasseQuery,
} = classeAPI;
