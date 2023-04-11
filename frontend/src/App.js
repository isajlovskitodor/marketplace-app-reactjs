import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import ProductsPage, {
  loader as productsListLoader,
} from "./pages/ProductsPage";
import ProductDetailsPage, {
  loader as productDetailsLoader,
  action as deleteProductAction,
} from "./pages/ProductDetailsPage";
import LoginPage, { action as loginAction } from "./pages/LoginPage";
import RegisterPage, { action as registerAction } from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import EditProductPage from "./pages/EditProductPage";
import NewProductPage from "./pages/NewProductPage";
import { action as manipulateProductAction } from "./components/form/ProductForm";
import { CartContextProvider } from "./context/cart-context";
import { ColorModeProvider } from "./context/color-theme-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: productsListLoader,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <ProductsPage />,
            loader: productsListLoader,
          },
          {
            path: ":productId",
            loader: productDetailsLoader,
            id: "product-details",
            children: [
              {
                index: true,
                element: <ProductDetailsPage />,
                action: deleteProductAction,
              },
              {
                path: "edit",
                element: <EditProductPage />,
                loader: checkAuthLoader,
                action: manipulateProductAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewProductPage />,
            action: manipulateProductAction,
            loader: checkAuthLoader,
          },
        ],
      },

      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

const App = () => {
  return (
    <CartContextProvider>
      <ColorModeProvider>
        <RouterProvider router={router} />;
      </ColorModeProvider>
    </CartContextProvider>
  );
};

export default App;
