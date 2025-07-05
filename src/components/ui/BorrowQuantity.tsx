import React, { useState } from "react";
import { useBorrowBookMutation } from "../../redux/api/baseApi";

interface BorrowQuantityProps {
  availableCopies: number;
  id: number | string | undefined;
}

const BorrowQuantity: React.FC<BorrowQuantityProps> = ({
  availableCopies,
  id,
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  const today = new Date().toISOString().split("T")[0];

  const [borrowBook, { data, isLoading, isError, error: borrowBookError }] =
    useBorrowBookMutation();

  console.log({ data, isLoading, isError, error: borrowBookError });

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
      setError("");
    }
  };

  const handleIncrease = () => {
    if (quantity < availableCopies) {
      setQuantity((prev) => prev + 1);
      setError("");
    } else {
      setError(`Cannot exceed available copies (${availableCopies})`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    if (value < 0) {
      setError("Quantity cannot be negative");
    } else if (value > availableCopies) {
      setError(`Cannot exceed available copies (${availableCopies})`);
    } else {
      setQuantity(value);
      setError("");
    }
  };

  const handleSubmit = () => {
    if (quantity < 1) {
      setError("Please enter a quantity greater than 0");
    } else if (quantity > availableCopies) {
      setError(`Cannot exceed available copies (${availableCopies})`);
    } else if (!dueDate) {
      setError("Please select a due date");
    } else {
      setError("");
      // Example: send data to backend or handle it here
      // console.log({
      //   book: id,
      //   quantity,
      //   dueDate,
      // });
      borrowBook({
        book: id,
        quantity,
        dueDate,
      });

      // Reset
      setQuantity(0);
      setDueDate("");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 mx-auto mt-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white max-w-md">
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg rounded"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleChange}
            min={0}
            max={availableCopies}
            className="w-16 text-center border rounded px-2 py-1"
          />
          <button
            onClick={handleIncrease}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg rounded"
          >
            +
          </button>
          <div>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={today}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Borrow Book
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </>
  );
};

export default BorrowQuantity;
