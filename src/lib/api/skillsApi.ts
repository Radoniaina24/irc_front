import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const skilleAPI = createApi({
  reducerPath: "skilleAPI",
  tagTypes: ["skille"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getSkill: builder.query({
      query: (params) => {
        return {
          url: `skille`,
          method: "GET",
          params,
        };
      },
      providesTags: ["skille"],
    }),
    addSkill: builder.mutation({
      query: (obj) => {
        return {
          url: `/skille`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["skille"],
    }),
    updateSkill: builder.mutation({
      query: ({ skille, id }) => {
        return {
          url: `/skille/${id}`,
          method: "PUT",
          body: skille,
        };
      },
      invalidatesTags: ["skille"],
    }),
    deleteSkill: builder.mutation({
      query: (id) => {
        return {
          url: `/skille/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["skille"],
    }),
  }),
});

export const {
  useGetSkillQuery,
  useAddSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skilleAPI;
