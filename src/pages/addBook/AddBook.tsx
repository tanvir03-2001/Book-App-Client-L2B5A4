import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateBookMutation } from "../../redux/api/baseApi";

export interface IBook {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  imageUrl: string;
}

const AddBook = () => {
  const [createBook, { isLoading, isError, error, isSuccess }] =
    useCreateBookMutation();

  console.log(error);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IBook>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
      imageUrl: "",
    },
  });

  const handleTost = () => {
    toast.success("tost check");
  };

  const onSubmit = async (data: IBook) => {
    try {
      const result = await createBook(data).unwrap();
      console.log("Created:", result);
      if (result?.success) {
        toast.success(result.message);
      }
      reset();
    } catch (err) {
      console.error("Creation error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 border rounded-xl shadow space-y-4 bg-white"
    >
      <h2 onClick={handleTost} className="text-2xl font-semibold">
        Add Book
      </h2>

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

      <select
        {...register("genre", { required: "Genre is required" })}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Genre</option>
        <option value="FICTION">Fiction</option>
        <option value="NON_FICTION">Non-fiction</option>
        <option value="SCIENCE">Science</option>
        <option value="HISTORY">History</option>
        <option value="BIOGRAPHY">Biography</option>
        <option value="FANTASY">Fantasy</option>
      </select>
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
        placeholder="Copies"
        min={1}
        {...register("copies", {
          required: "Copies required",
          min: { value: 1, message: "At least 1 copy" },
        })}
        className="w-full p-2 border rounded"
        onKeyDown={(e) => {
          if (["e", "-", "+"].includes(e.key)) e.preventDefault();
        }}
      />
      {errors.copies && <p className="text-red-500">{errors.copies.message}</p>}

      <input
        type="text"
        placeholder="Image URL"
        {...register("imageUrl", { required: "Image URL required" })}
        className="w-full p-2 border rounded"
      />
      {errors.imageUrl && (
        <p className="text-red-500">{errors.imageUrl.message}</p>
      )}

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("available")} className="w-4 h-4" />
        <label className="text-sm">Available</label>
      </div>

      {/* Submission Feedback */}
      {isSuccess && (
        <p className="text-green-600">Book created successfully!</p>
      )}
      {isError && <p className="text-red-600">Failed to create book:</p>}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 rounded text-white ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AddBook;
