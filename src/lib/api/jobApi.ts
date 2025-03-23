import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const jobAPI = createApi({
  reducerPath: "jobAPI",
  tagTypes: ["job"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getJob: builder.query({
      query: (params) => {
        return {
          url: `job`,
          method: "GET",
          params,
        };
      },
      providesTags: ["job"],
    }),
    getAllJob: builder.query({
      query: (params) => {
        return {
          url: `/application`,
          method: "GET",
          params,
        };
      },
      providesTags: ["job"],
    }),
    getMyJob: builder.query({
      query: (params) => {
        return {
          url: `/job-posts/my_jobPost`,
          method: "GET",
          params,
        };
      },
      providesTags: ["job"],
    }),
    getJobById: builder.query({
      query: (id) => {
        return {
          url: `job/${id}`,
          method: "GET",
        };
      },
      providesTags: ["job"],
    }),
    addJob: builder.mutation({
      query: (obj) => {
        return {
          url: `/job-posts/register`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["job"],
    }),
    updateJob: builder.mutation({
      query: ({ jobPost, id }) => {
        return {
          url: `/job-posts/update/${id}`,
          method: "PUT",
          body: jobPost,
        };
      },
      invalidatesTags: ["job"],
    }),
    deleteJob: builder.mutation({
      query: (id) => {
        return {
          url: `/job-posts/delete/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["job"],
    }),
  }),
});

export const {
  useGetJobQuery,
  useGetJobByIdQuery,
  useAddJobMutation,
  useDeleteJobMutation,
  useUpdateJobMutation,
  useGetAllJobQuery,
  useGetMyJobQuery,
} = jobAPI;
