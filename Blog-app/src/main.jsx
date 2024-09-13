import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux"
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import AddPost from "./Pages/AddPost.jsx";
import store from "./Redux/Store.js";
import Home from "./Pages/Home.jsx";
import AllPosts from "./Pages/AllPosts.jsx";
import Post from "./Pages/Post.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/addposts" element={<AddPost />} />
    <Route path="/allposts" element={<AllPosts />} />
    <Route path="/posts/:slug" element={<Post />} />
  </Route>
));

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
