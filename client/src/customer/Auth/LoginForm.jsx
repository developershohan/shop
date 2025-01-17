import {
  Grid,
  TextField,
  Button,
  OutlinedInput,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
// import { signInPending, signInRejected, signInSuccess } from "../../features/auth/authSlice";
import AuthModal from "./AuthModal";
import RegisterForm from "./RegisterForm";
import { setMessageEmpty, userSelector } from "../../features/auth/authSlice";
import { login } from "../../features/auth/authApiSlice";
import createToast from "../../utils/tostify";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ handleClose }) => {
  // const [errorMsg, setErrorMsg] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    auth: "",
    password: "",
  });

  const [mode, setMode] = useState("login");
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const handleOpen = (mode) => {
    setMode(mode); // Set the mode when opening the modal
    setOpenAuthModal(true);
  };

  const { message, loader, error } = useSelector(userSelector);

  const toggleMode = () => {
    // Toggle between "login" and "register" modes
    setMode((prevMode) => (prevMode === "login" ? "register" : "login"));
  };

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(login(input));


  };
  useEffect(() => {
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
      navigate("/");
      setOpenAuthModal(false);
    }
    if (error) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="auth"
              label="Email Address"
              required
              name="auth"
              fullWidth
              autoComplete="given-name"
              onChange={handleInputChange}
              value={input.auth}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl xs={12} className=" w-full ">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleInputChange}
                value={input.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={loader}
              type="submit"
              className=" w-full "
              variant="contained"
              color="primary"
              size="large">
              {loader ? "Loading.." : "Login"}
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* <p> {error && error.data.message} </p> */}
      {/* <div className="form-footer flex gap-1 align-middle justify-center mt-3">
        <p>{`If you don't have account?`}</p>
        <Button onClick={() => handleOpen("register") } variant="text" color="primary" className=" font-semibold" sx={{ p: 0 }}  >
          Register</Button>
      </div> */}
      <AuthModal
        open={openAuthModal}
        handleClose={handleClose}
        mode={mode} // Pass the mode prop to AuthModal
        RegisterFormComponent={RegisterForm}
        toggleMode={toggleMode}
      />
    </div>
  );
};

export default LoginForm;
