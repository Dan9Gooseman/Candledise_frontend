// import { Dashboard, Login, ShoppingCart } from "@mui/icons-material";
// import ClientLayout from "./layout/ClientLayout";
// import AllProducts from "./page/AllProducts";
// import ProductDetail from "./page/ProductDetail";
// import AdminLayout from "./layout/AdminLayout";
// import { Navigate, useRoutes } from "react-router-dom";
// import Products from "./admin/Products";
// import CreateProduct from "./admin/CreateProduct";
// import UpdateProduct from "./admin/UpdateProduct";
// import Register from "./page/Register";

// const routeConfig = [
//     {
//       path: "/",
//       element: <ClientLayout />,
//       children: [
//         { path: "/", element: <AllProducts /> },
//         { path: "products/:id", element: <ProductDetail /> },
//         { path: "shopping-cart", element: <ShoppingCart /> }, // Ensure component rendering, not icon
//       ],
//     },
//     {
//       path: "/admin",
//       element: <AdminLayout />,
//       children: [
//         { path: "", element: <Navigate to="/admin/dashboard" /> }, // Correct path usage
//         { path: "dashboard", element: <Dashboard /> }, // Ensure component is used properly
//         { path: "users", element: <h1>User settings</h1> },
//         { path: "products", element: <Products /> },
//         { path: "products/create", element: <CreateProduct /> },
//         { path: "products/:id", element: <UpdateProduct /> },
//         { path: "orders", element: <h1>Order settings</h1> },
//         { path: "sales", element: <h1>Sale settings</h1> },
//       ],
//     },
//     { path: "/login", element: <Login /> }, // Ensure correct usage
//     { path: "/register", element: <Register /> },
//   ];

// function App() {
//   const routes = useRoutes(routeConfig);

//   return <main>{routes}</main>;
// }

// export default App;
