import { useForm } from "react-hook-form";

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

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormData>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: "",
      imageUrl: "",
    },
  });

  const onSubmit = (data: BookFormData) => {
    console.log("Submitted Book:", data);
    reset(); // Clear form after submission
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 border rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Add Book</h2>

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

      {errors.available && (
        <p className="text-red-500">{errors.available.message}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default AddBook;
