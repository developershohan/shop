// PrivateRoute.jsx
import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";

const LoggedInRedirect = () => {
  const { loginState, user } = useSelector((state) => state.user);
console.log(user);

return loginState ? (<Outlet/>) : <Navigate to="/"/>

};

export default LoggedInRedirect;
