import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setMessageEmpty,
  userSelector,
} from "../../../features/auth/authSlice";
import { logout } from "../../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import createToast from "../../../utils/tostify";
// import { signOutSuccess } from '../../../features/auth/authSlice'

const Profile = () => {
  const { user, message, error } = useSelector(userSelector);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const handleSignOut = async () => {
    dispatch(logout());
    navigate("/");
  };
  useEffect(() => {
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
    if (error) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch]);

  return (
    <div>
      <div className=" flex gap-4 flex-col mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-3" onSubmit={handleSubmit} method="POST">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              type="text"
              name="fname"
              id="fname"
              autoComplete="fname"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="f"
              onChange={handleInputChange}
              defaultValue={user.fname}
            />
          </div>
          <div>
            <input
              id="auth"
              name="auth"
              type="auth"
              autoComplete="auth"
              placeholder="auth Address"
              required
              className="block w-full bg-transparent rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleInputChange}
              defaultValue={user.email}
            />
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              required
              className="block w-full bg-transparent rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleInputChange}
              defaultValue={user.email}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>

        <div className="bottom-buttons">
          <button
            className=" flex justify-center rounded-md bg-red-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
