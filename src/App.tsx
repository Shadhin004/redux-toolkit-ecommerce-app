import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";


import HomePage from "./pages/HomePage";
import Navbar from "./layouts/NavBar";
import ProductDetails from "./pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Navbar />,
    children : [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path : '/products/:id',
        element : <ProductDetails />
      }
    ]
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);
const App = () => {
  return (
      <RouterProvider router={router} />
  )
}

export default App
