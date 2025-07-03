import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "book",
        method: "POST",
        body: bookData,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useCreateBookMutation } = baseApi;
