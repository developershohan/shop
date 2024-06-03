import { useSelector } from "react-redux";
import { userSelector } from "../features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const PublicGard = () => {
  const { user } = useSelector(userSelector);
  if (localStorage.getItem("loginUser")) {
    return user ? <Navigate to="/account" /> : <Outlet />;
  } else {
    return <Outlet />;
  }
};

export default PublicGard;
