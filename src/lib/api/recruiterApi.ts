import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recruiterAPI = createApi({
  reducerPath: "recruiterAPI",
  tagTypes: ["recruiter"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getRecruiter: builder.query({
      query: (params) => {
        return {
          url: `recruiter`,
          method: "GET",
          params,
        };
      },
      providesTags: ["recruiter"],
    }),
    getAllRecruiter: builder.query({
      query: (params) => {
        return {
          url: `recruiter`,
          method: "GET",
          params,
        };
      },
      providesTags: ["recruiter"],
    }),
    getRecruiterById: builder.query({
      query: (id) => {
        return {
          url: `recruiter/${id}`,
          method: "GET",
        };
      },
      providesTags: ["recruiter"],
    }),
    getProfil: builder.query({
      query: () => {
        return {
          url: `recruiter/my-profile`,
          method: "GET",
        };
      },
      providesTags: ["recruiter"],
    }),
    addRecruiter: builder.mutation({
      query: (values) => {
        return {
          url: `recruiter/register`,
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["recruiter"],
    }),
    updateRecruiter: builder.mutation({
      query: ({ recruiter, id }) => {
        return {
          url: `/recruiter/update`,
          method: "PUT",
          body: recruiter,
        };
      },
      invalidatesTags: ["recruiter"],
    }),
    deleteRecruiter: builder.mutation({
      query: (id) => {
        return {
          url: `/recruiter/delete/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["recruiter"],
    }),
    changePassword: builder.mutation({
      query: (obj) => {
        return {
          url: `/recruiter/change_password`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["recruiter"],
    }),
  }),
});

export const {
  useGetRecruiterQuery,
  useGetRecruiterByIdQuery,
  useAddRecruiterMutation,
  useDeleteRecruiterMutation,
  useUpdateRecruiterMutation,
  useGetAllRecruiterQuery,
  useChangePasswordMutation,
  useGetProfilQuery,
} = recruiterAPI;
