import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const candidateAPI = createApi({
  reducerPath: "candidateAPI",
  tagTypes: ["candidate"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getCandidate: builder.query({
      query: (params) => {
        return {
          url: `candidate`,
          method: "GET",
          params,
        };
      },
      providesTags: ["candidate"],
    }),
    getAllCandidate: builder.query({
      query: (params) => {
        return {
          url: `candidate`,
          method: "GET",
          params,
        };
      },
      providesTags: ["candidate"],
    }),
    getCandidateById: builder.query({
      query: (id) => {
        return {
          url: `candidate/${id}`,
          method: "GET",
        };
      },
      providesTags: ["candidate"],
    }),
    getProfil: builder.query({
      query: () => {
        return {
          url: `candidate/my-profile`,
          method: "GET",
        };
      },
      providesTags: ["candidate"],
    }),
    addCandidate: builder.mutation({
      query: (values) => {
        return {
          url: `candidate/register`,
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["candidate"],
    }),
    updateCandidate: builder.mutation({
      query: ({ candidate, id }) => {
        return {
          url: `/candidate/update`,
          method: "PUT",
          body: candidate,
        };
      },
      invalidatesTags: ["candidate"],
    }),
    deleteCandidate: builder.mutation({
      query: (id) => {
        return {
          url: `/candidate/delete/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["candidate"],
    }),
    changePassword: builder.mutation({
      query: (obj) => {
        return {
          url: `/candidate/change_password`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["candidate"],
    }),
  }),
});

export const {
  useGetCandidateQuery,
  useGetCandidateByIdQuery,
  useAddCandidateMutation,
  useDeleteCandidateMutation,
  useUpdateCandidateMutation,
  useGetAllCandidateQuery,
  useChangePasswordMutation,
  useGetProfilQuery,
} = candidateAPI;
