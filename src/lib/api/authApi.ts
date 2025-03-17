import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authAPI = createApi({
  reducerPath: "authAPI",
  tagTypes: ["authentication"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include", // S'assurer que les cookies sont envoyés avec la requête
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => {
        return {
          url: "/auth/me",
          method: "GET",
        };
      },
      providesTags: ["authentication"],
    }),
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: credentials,
        };
      },
      invalidatesTags: ["authentication"],
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: "/auth/logout",
          method: "POST",
        };
      },
      invalidatesTags: ["authentication"],
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery, useLogoutMutation } = authAPI;
