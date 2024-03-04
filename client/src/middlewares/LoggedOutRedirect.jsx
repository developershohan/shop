// PrivateRoute.jsx
import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";

const LoggedOutRedirect = () => {
  const { loginState, user } = useSelector((state) => state.user);
console.log(user);

return loginState ? <Navigate to="/account"/>  : <Outlet/>

};

export default LoggedOutRedirect;
