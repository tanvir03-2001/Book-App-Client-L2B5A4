import { createBrowserRouter } from "react-router";
import App from "../App";
import AddBook from "../pages/addBook/AddBook";
import AllBooks from "../pages/allBooks/AllBooks";
import BorrowSummary from "../pages/borrowSummary/BorrowSummary";
import EditBook from "../pages/editBook/EditBook";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <div>hello world</div>,
    Component: App,
    children: [
      {
        // path: "all-books",
        Component: AllBooks,
        index: true,
      },
      {
        path: "all-books",
        Component: AllBooks,
      },
      {
        path: "add-book",
        Component: AddBook,
      },
      {
        path: "edit-book",
        Component: EditBook,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);

export default router;
