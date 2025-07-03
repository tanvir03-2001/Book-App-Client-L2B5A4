import { createBrowserRouter } from "react-router";
import App from "../App";
import AddBook from "../pages/addBook/AddBook";
import AllBooks from "../pages/allBooks/AllBooks";

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
    ],
  },
]);

export default router;
