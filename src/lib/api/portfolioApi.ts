import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const portfolioAPI = createApi({
  reducerPath: "portfolioAPI",
  tagTypes: ["portfolio"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getPortfolio: builder.query({
      query: (params) => {
        return {
          url: `portfolio`,
          method: "GET",
          params,
        };
      },
      providesTags: ["portfolio"],
    }),
    addPortfolio: builder.mutation({
      query: (obj) => {
        return {
          url: `/portfolio`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["portfolio"],
    }),
    updatePortfolio: builder.mutation({
      query: ({ portfolio, id }) => {
        return {
          url: `/portfolio/${id}`,
          method: "PUT",
          body: portfolio,
        };
      },
      invalidatesTags: ["portfolio"],
    }),
    deletePortfolio: builder.mutation({
      query: (id) => {
        return {
          url: `/portfolio/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["portfolio"],
    }),
  }),
});
export const {
  useGetPortfolioQuery,
  useAddPortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioAPI;
