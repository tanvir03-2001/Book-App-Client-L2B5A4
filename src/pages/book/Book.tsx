import { useParams } from "react-router";
import { useGetBookQuery } from "../../redux/api/baseApi";

export default function Book() {
  const { bookId } = useParams();

  const { data, isLoading, isError, error } = useGetBookQuery(bookId);
  console.log(error);

  const book = data?.data;

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-lg text-gray-600">
        Loading book details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-20 text-red-600">
        Failed to load book. {error?.data?.message || "Something went wrong."}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center mt-20 text-gray-600">
        No book data available.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg flex flex-col sm:flex-row gap-6">
      {/* Book Cover */}
      <div className="flex-shrink-0">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-44 h-64 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Book Details */}
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">{book.title}</h1>
          <p className="text-gray-600 mt-1 text-sm">by {book.author}</p>

          <span className="inline-block mt-3 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {book.genre?.replace("_", " ")}
          </span>

          <p className="mt-4 text-gray-700 text-sm">{book.description}</p>

          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>ISBN: {book.isbn}</p>
            <p>Copies: {book.copies}</p>
            <p>
              Status:{" "}
              <span
                className={book.available ? "text-green-600" : "text-red-600"}
              >
                {book.available ? "Available" : "Unavailable"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-400 mt-4">
          <span>Created: {new Date(book.createdAt).toLocaleString()}</span>
          <span>Updated: {new Date(book.updatedAt).toLocaleString()}</span>
        </div>

        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Reserve Book
        </button>
      </div>
    </div>
  );
}
