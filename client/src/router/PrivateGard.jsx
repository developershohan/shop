import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { userSelector } from "../features/auth/authSlice";

const PrivateGard = () => {
  const { user } = useSelector(userSelector);
  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default PrivateGard;
