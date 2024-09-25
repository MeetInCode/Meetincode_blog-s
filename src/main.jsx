import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AddPost,
  AllPosts,
  EditPost,
  Home,
  Login,
  Showpost,
  SignUp,
} from "./pages/index.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/all-posts",
        element: <AllPosts />,
      },
      {
        path: "/add-post",
        element: <AddPost />,
      },
      {
        path: "/edit-post/:slug",
        element: <EditPost />,
      },
      {
        path: "/postinfo",
        element: <Showpost />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
