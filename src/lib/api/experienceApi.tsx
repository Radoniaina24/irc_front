import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const experienceAPI = createApi({
  reducerPath: "experienceAPI",
  tagTypes: ["experience"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getExperience: builder.query({
      query: (params) => {
        return {
          url: `experience`,
          method: "GET",
          params,
        };
      },
      providesTags: ["experience"],
    }),
    addExperience: builder.mutation({
      query: (obj) => {
        return {
          url: `/experience`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["experience"],
    }),
    updateExperience: builder.mutation({
      query: ({ experience, id }) => {
        return {
          url: `/experience/${id}`,
          method: "PUT",
          body: experience,
        };
      },
      invalidatesTags: ["experience"],
    }),
    deleteExperience: builder.mutation({
      query: (id) => {
        return {
          url: `/experience/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["experience"],
    }),
  }),
});

export const {
  useGetExperienceQuery,
  useAddExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceAPI;
