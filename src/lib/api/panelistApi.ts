import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const panelistsAPI = createApi({
  reducerPath: "panelistsAPI",
  tagTypes: ["panelists"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getPanelist: builder.query({
      query: (params) => {
        return {
          url: `panelists`,
          method: "GET",
          params,
        };
      },
      providesTags: ["panelists"],
    }),
    getAllPanelist: builder.query({
      query: (params) => {
        return {
          url: `panelists`,
          method: "GET",
          params,
        };
      },
      providesTags: ["panelists"],
    }),
    getPanelistById: builder.query({
      query: (id) => {
        return {
          url: `panelists/${id}`,
          method: "GET",
        };
      },
      providesTags: ["panelists"],
    }),
    addPanelist: builder.mutation({
      query: (obj) => {
        return {
          url: `panelists/register`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["panelists"],
    }),
    updatePanelist: builder.mutation({
      query: ({ updatePanelist, id }) => {
        return {
          url: `/panelists/update/${id}`,
          method: "PUT",
          body: updatePanelist,
        };
      },
      invalidatesTags: ["panelists"],
    }),
    deletePanelist: builder.mutation({
      query: (id) => {
        return {
          url: `/panelists/delete/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["panelists"],
    }),
  }),
});

export const {
  useGetPanelistQuery,
  useGetPanelistByIdQuery,
  useAddPanelistMutation,
  useDeletePanelistMutation,
  useUpdatePanelistMutation,
  useGetAllPanelistQuery,
} = panelistsAPI;
