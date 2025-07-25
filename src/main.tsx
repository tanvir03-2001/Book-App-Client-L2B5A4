import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "./components/ui/sonner";
import "./index.css";
import { store } from "./redux/store";
import router from "./routers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <Toaster position="top-right" richColors />
    </div>
  </StrictMode>
);
