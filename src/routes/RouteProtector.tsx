import { Navigate, Outlet } from "react-router-dom";

const RouteProtector = () => {
  try {
    const localStorageUser = localStorage.getItem("user");

    if (localStorageUser) {
      const user = JSON.parse(localStorageUser);

      if (user && user.role === "admin") {
        return <Outlet />;
      }
    }
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
  }

  return <Navigate to="/" replace />;
};

export default RouteProtector;
