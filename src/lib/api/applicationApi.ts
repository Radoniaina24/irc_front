import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const applicationAPI = createApi({
  reducerPath: "applicationAPI",
  tagTypes: ["application"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getApplication: builder.query({
      query: (params) => {
        return {
          url: `application`,
          method: "GET",
          params,
        };
      },
      providesTags: ["application"],
    }),
    getAllApplication: builder.query({
      query: (params) => {
        return {
          url: `application`,
          method: "GET",
          params,
        };
      },
      providesTags: ["application"],
    }),
    getApplicationRecruiter: builder.query({
      query: () => {
        return {
          url: `application/recruiter_application`,
          method: "GET",
        };
      },
      providesTags: ["application"],
    }),
    addApplication: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/application/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["application"],
    }),
    updateApplication: builder.mutation({
      query: ({ obj, id }) => {
        return {
          url: `/application/update/${id}`,
          method: "PUT",
          body: obj,
        };
      },
      invalidatesTags: ["application"],
    }),
    deleteApplication: builder.mutation({
      query: (id) => {
        return {
          url: `/application/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["application"],
    }),
  }),
});
export const {
  useGetApplicationQuery,
  useGetApplicationRecruiterQuery,
  useAddApplicationMutation,
  useDeleteApplicationMutation,
  useUpdateApplicationMutation,
  useGetAllApplicationQuery,
} = applicationAPI;
