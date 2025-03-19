import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const sectorAPI = createApi({
  reducerPath: "sectorAPI",
  tagTypes: ["sector"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getSector: builder.query({
      query: (params) => {
        return {
          url: `sector`,
          method: "GET",
          params,
        };
      },
      providesTags: ["sector"],
    }),
    getAllSector: builder.query({
      query: (params) => {
        return {
          url: `sector`,
          method: "GET",
          params,
        };
      },
      providesTags: ["sector"],
    }),
    getSectorById: builder.query({
      query: (id) => {
        return {
          url: `sector/${id}`,
          method: "GET",
        };
      },
      providesTags: ["sector"],
    }),
    addSector: builder.mutation({
      query: (obj) => {
        return {
          url: `sector`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["sector"],
    }),
    updateSector: builder.mutation({
      query: ({ updateSector, id }) => {
        return {
          url: `/sector/${id}`,
          method: "PUT",
          body: updateSector,
        };
      },
      invalidatesTags: ["sector"],
    }),
    deleteSector: builder.mutation({
      query: (id) => {
        return {
          url: `/sector/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["sector"],
    }),
  }),
});

export const {
  useGetSectorQuery,
  useGetSectorByIdQuery,
  useAddSectorMutation,
  useDeleteSectorMutation,
  useUpdateSectorMutation,
  useGetAllSectorQuery,
} = sectorAPI;
