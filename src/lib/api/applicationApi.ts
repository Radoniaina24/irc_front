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
    getApplicationById: builder.query({
      query: (id) => {
        return {
          url: `application/${id}`,
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
      query: ({ name, id, sector }) => {
        return {
          url: `/application/${id}`,
          method: "PUT",
          body: { sector, name },
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
  useGetApplicationByIdQuery,
  useAddApplicationMutation,
  useDeleteApplicationMutation,
  useUpdateApplicationMutation,
  useGetAllApplicationQuery,
} = applicationAPI;
