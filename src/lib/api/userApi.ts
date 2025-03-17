import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersAPI = createApi({
  reducerPath: "usersAPI",
  tagTypes: ["user"],
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
    getUser: builder.query({
      query: (params) => {
        return {
          url: `users`,
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),
    getAllUser: builder.query({
      query: (params) => {
        return {
          url: `users`,
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),
    getUserById: builder.query({
      query: (id) => {
        return {
          url: `users/${id}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    addUser: builder.mutation({
      query: (obj) => {
        return {
          url: `users/register`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ user, id }) => {
        return {
          url: `/users/update/${id}`,
          method: "PUT",
          body: user,
        };
      },
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/delete/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetAllUserQuery,
} = usersAPI;
