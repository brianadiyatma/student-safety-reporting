import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Auth = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/admin/sign-in" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default Auth;
