import { Navigate, Outlet } from "react-router-dom";
import { RouteSignIn } from "@/helpers/RouteName";
import { useAuthStore } from "@/store/authStore";

const AuthRouteProtechtion = () => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <div className="text-center mt-20">Checking authentication...</div>;
  }

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={RouteSignIn} />;
  }
};

export default AuthRouteProtechtion;
