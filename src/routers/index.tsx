import { createBrowserRouter } from "react-router";
import App from "../App";
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
    ],
  },
]);

export default router;
