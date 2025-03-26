import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const certificationAPI = createApi({
  reducerPath: "certificationAPI",
  tagTypes: ["certification"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getCertification: builder.query({
      query: (params) => {
        return {
          url: `certification`,
          method: "GET",
          params,
        };
      },
      providesTags: ["certification"],
    }),
    addCertification: builder.mutation({
      query: (obj) => {
        return {
          url: `/certification`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["certification"],
    }),
    updateCertification: builder.mutation({
      query: ({ certification, id }) => {
        return {
          url: `/certification/${id}`,
          method: "PUT",
          body: certification,
        };
      },
      invalidatesTags: ["certification"],
    }),
    deleteCertification: builder.mutation({
      query: (id) => {
        return {
          url: `/certification/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["certification"],
    }),
  }),
});

export const {
  useGetCertificationQuery,
  useAddCertificationMutation,
  useUpdateCertificationMutation,
  useDeleteCertificationMutation,
} = certificationAPI;
