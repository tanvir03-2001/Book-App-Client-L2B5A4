import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useEditBookMutation, useGetBookQuery } from "../../redux/api/baseApi";

interface BookFormData {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: string;
  available: boolean;
  imageUrl: string;
}

const EditBook = () => {
  const { bookId } = useParams();
  const { data, isLoading, isError } = useGetBookQuery(bookId);
  const book = data?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormData>();

  // Reset form with fetched book data
  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: String(book.copies),
        available: book.available,
        imageUrl: book.imageUrl,
      });
    }
  }, [book, reset]);

  const [
    editBook,
    {
      data: editBookData,
      isError: editIsError,
      isLoading: editIsLoading,
      error: editError,
    },
  ] = useEditBookMutation();

  console.log({ editBookData, editIsError, editError, editIsLoading });

  const onSubmit = (formData: BookFormData) => {
    console.log("Submitted Book:", formData);
    editBook({ id: bookId, data: formData });
    // Update logic here
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load book data.</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 border rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Update Book</h2>

      <input
        type="text"
        placeholder="Title"
        {...register("title", { required: "Title is required" })}
        className="w-full p-2 border rounded"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <input
        type="text"
        placeholder="Author"
        {...register("author", { required: "Author is required" })}
        className="w-full p-2 border rounded"
      />
      {errors.author && <p className="text-red-500">{errors.author.message}</p>}

      <input
        type="text"
        placeholder="Genre"
        {...register("genre", { required: "Genre is required" })}
        className="w-full p-2 border rounded"
      />
      {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}

      <input
        type="text"
        placeholder="ISBN"
        {...register("isbn", { required: "ISBN is required" })}
        className="w-full p-2 border rounded"
      />
      {errors.isbn && <p className="text-red-500">{errors.isbn.message}</p>}

      <textarea
        placeholder="Description"
        {...register("description", { required: "Description is required" })}
        className="w-full p-2 border rounded"
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}

      <input
        type="number"
        placeholder="Number of Copies"
        {...register("copies", {
          required: "Number of copies is required",
          min: { value: 1, message: "Must be at least 1 copy" },
        })}
        className="w-full p-2 border rounded"
      />
      {errors.copies && <p className="text-red-500">{errors.copies.message}</p>}

      <input
        type="text"
        placeholder="Image URL"
        {...register("imageUrl", { required: "Image URL is required" })}
        className="w-full p-2 border rounded"
      />
      {errors.imageUrl && (
        <p className="text-red-500">{errors.imageUrl.message}</p>
      )}

      <label className="flex items-center space-x-2">
        <input type="checkbox" {...register("available")} />
        <span>Available</span>
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default EditBook;
