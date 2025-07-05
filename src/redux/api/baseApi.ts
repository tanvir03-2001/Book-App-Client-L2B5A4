import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-shop-server-olive.vercel.app/api",
  }),
  tagTypes: ["books", "borrow"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    getBook: builder.query({
      query: (bookId) => `/book/${bookId}`,
      providesTags: ["books"],
    }),
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "book",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["books", "borrow"],
    }),
    editBook: builder.mutation({
      query: (book) => ({
        url: `book/${book.id}`,
        method: "PUT",
        body: book.data,
      }),
      invalidatesTags: ["books", "borrow"],
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `book/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books", "borrow"],
    }),
    borrowBook: builder.mutation({
      query: (data) => ({
        url: "/borrow",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books", "borrow"],
    }),
    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = baseApi;
