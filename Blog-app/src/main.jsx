import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/Store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<App />}>
    
  </Route>
));

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
