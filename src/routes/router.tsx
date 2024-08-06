import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import ClientLayout from "../layout/ClientLayout";
import AllProducts from "../page/AllProducts";
import Login from "../page/Login";
import ProductDetail from "../page/ProductDetail";
import Register from "../page/Register";
import Dashboard from "../admin/Dashboard";
import Products from "../admin/Products";
import UpdateProduct from "../admin/UpdateProduct";
import CreateProduct from "../admin/CreateProduct";
import ShoppingCart from "../page/ShoppingCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    errorElement: <p>There's nothing here but us Chickens</p>,
    children: [
      { path: "/", element: <AllProducts /> },
      { path: "/products/:id", element: <ProductDetail /> },
      { path: "/shopping-cart", element: <ShoppingCart /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <p>There's nothing here but us Chickens</p>,
    children: [
      { path: "/admin", element: <Navigate to={"/admin/dashboard"} /> },
      { path: "/admin/dashboard", element: <Dashboard /> },
      { path: "/admin/users", element: <h1>User settings</h1> },
      { path: "/admin/products", element: <Products /> },
      { path: "/admin/products/create", element: <CreateProduct /> },
      { path: "/admin/products/:id", element: <UpdateProduct /> },
      { path: "/admin/orders", element: <h1>Order settings</h1> },
      { path: "/admin/sales", element: <h1>Sale settings</h1> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
