import { logout } from "@/redux/features/auth/authSlice";
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
    refreshToken: builder.query({
      query: () => {
        return {
          url: "/auth/refresh-token",
          method: "GET",
        };
      },
      providesTags: ["authentication"],
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: "/auth/logout",
          method: "POST",
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout()); // Supprimer l'utilisateur de Redux
          dispatch(authAPI.util.resetApiState()); // Nettoyer complètement RTK Query
        } catch (error) {
          console.error("Erreur lors de la déconnexion :", error);
        }
      },
      invalidatesTags: ["authentication"],
    }),
  }),
});
export const {
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
  useRefreshTokenQuery,
} = authAPI;
