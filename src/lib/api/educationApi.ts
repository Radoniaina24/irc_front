import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const educationAPI = createApi({
  reducerPath: "educationAPI",
  tagTypes: ["education"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getEducation: builder.query({
      query: (params) => {
        return {
          url: `education`,
          method: "GET",
          params,
        };
      },
      providesTags: ["education"],
    }),
    addEducation: builder.mutation({
      query: (obj) => {
        return {
          url: `/education`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["education"],
    }),
    updateEducation: builder.mutation({
      query: ({ education, id }) => {
        return {
          url: `/education/${id}`,
          method: "PUT",
          body: education,
        };
      },
      invalidatesTags: ["education"],
    }),
    deleteEducation: builder.mutation({
      query: (id) => {
        return {
          url: `/education/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["education"],
    }),
  }),
});

export const {
  useGetEducationQuery,
  useAddEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} = educationAPI;
