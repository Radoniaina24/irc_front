import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const languageAPI = createApi({
  reducerPath: "languageAPI",
  tagTypes: ["language"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getLanguage: builder.query({
      query: (params) => {
        return {
          url: `language`,
          method: "GET",
          params,
        };
      },
      providesTags: ["language"],
    }),
    addLanguage: builder.mutation({
      query: (obj) => {
        return {
          url: `/language`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["language"],
    }),
    updateLanguage: builder.mutation({
      query: ({ language, id }) => {
        return {
          url: `/language/${id}`,
          method: "PUT",
          body: language,
        };
      },
      invalidatesTags: ["language"],
    }),
    deleteLanguage: builder.mutation({
      query: (id) => {
        return {
          url: `/language/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["language"],
    }),
  }),
});

export const {
  useGetLanguageQuery,
  useAddLanguageMutation,
  useUpdateLanguageMutation,
  useDeleteLanguageMutation,
} = languageAPI;
