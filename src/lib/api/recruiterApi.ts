import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recruiterAPI = createApi({
  reducerPath: "recruiterAPI",
  tagTypes: ["recruiter"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token; // Récupération du token JWT depuis Redux
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include", // S'assurer que les cookies sont envoyés avec la requête
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
    addRecruiter: builder.mutation({
      query: (obj) => {
        return {
          url: `recruiter/register`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["recruiter"],
    }),
    updateRecruiter: builder.mutation({
      query: ({ recruiter, id }) => {
        return {
          url: `/recruiter/update/${id}`,
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
  }),
});

export const {
  useGetRecruiterQuery,
  useGetRecruiterByIdQuery,
  useAddRecruiterMutation,
  useDeleteRecruiterMutation,
  useUpdateRecruiterMutation,
  useGetAllRecruiterQuery,
} = recruiterAPI;
