import { useGetBorrowSummaryQuery } from "../../redux/api/baseApi";

export default function BorrowSummary() {
  const { data, isLoading } = useGetBorrowSummaryQuery(undefined);

  const books = data?.data || [];
  console.log(books);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (books.length < 0) {
    return <div>No Book Summary found</div>;
  }

  interface Daum {
    totalQuantity: number;
    book: Book;
  }

  interface Book {
    title: string;
    author: string;
    genre: string;
    isbn: string;
    copies: number;
    available: boolean;
    imageUrl: string;
  }

  return (
    <div className="container mx-auto px-2 sm:px-6 lg:px-8">
      <section className="container px-4 mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h2 className="text-lg font-medium text-gray-800 pt-5 ">
            Borrow Summary
          </h2>
        </div>

        {books.length > 0 ? (
          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 ">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          <div className="flex items-center gap-x-3">
                            <span>Title</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          Author
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          Genre
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          ISBN
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {books.map((book: Daum) => (
                        <tr key={book.book.isbn}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="flex items-center gap-x-2">
                                <div className="flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-full">
                                  <div className="flex items-center justify-center w-8 h-10 bg-blue-100 rounded-sm overflow-hidden">
                                    <img
                                      src={book.book.imageUrl}
                                      alt={book.book.title}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <h2 className="font-normal text-gray-800  ">
                                    {book.book.title}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                            {book.book.author}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {book.book.genre}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {book.book.isbn}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {book.totalQuantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>No Books Found</p>
          </div>
        )}
      </section>
    </div>
  );
}
