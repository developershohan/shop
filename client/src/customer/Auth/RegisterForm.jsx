import { Grid, TextField, Button,OutlinedInput,InputLabel,FormControl,InputAdornment,IconButton } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { signInPending, signInRejected, signInSuccess } from "../../features/auth/authSlice";
import AuthModal from "./AuthModal";
import LoginForm from "./LoginForm";


const RegisterForm = ({ handleClose }) => {

  const navigate = useNavigate()
  const [input, setInput] = useState({
    fname: "",
    lname: "",
    auth: "",
    password: "",
})
const dispatch = useDispatch()
const { loader, error } = useSelector((state) => state.user)

const [mode, setMode] = useState("login"); 
const [openAuthModal, setOpenAuthModal] = useState(false)
const handleOpen = (mode) => {

  setMode(mode); // Set the mode when opening the modal
  setOpenAuthModal(true);

};


const handleInputChange = (e) => {
  setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
  }))
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(signInPending())
    // Using axios for the POST request

    const res = await axios.post('http://localhost:5454/auth/register', input);
    dispatch(signInSuccess(res.data))
    navigate("/login")


} catch (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    dispatch(signInRejected(error.response))

    // setErrorMsg(error.response.data.message)// And even the headers
}
    // Handle error situation
} 

}
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div >
      <form onSubmit={handleSubmit} >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} >
            <TextField
              id="fname"
              label="First Name"
              required
              name="fname"
              fullWidth
              autoComplete="given-name"
              onChange={handleInputChange}
              value={input.fname}
            />
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField
              id="lname"
              label="Last Name"
              required
              name="lname"
              fullWidth
              autoComplete="given-name"
              onChange={handleInputChange}
              value={input.lname}
            />
          </Grid>
          <Grid item xs={12} >
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
          <Grid item xs={12} >
          <FormControl xs={12} className=" w-full ">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={handleInputChange}
            value={input.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
          </Grid>
          <Grid item xs={12} >
            <Button disabled={loader} type="submit" className=" w-full " variant="contained" color="primary" size="large">
              {loader ? "Loading.." : "Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <p> {error && error.data.message} </p>
      {/* <div className="form-footer flex gap-1 align-middle justify-center mt-3">
        <p>Already have an account?</p>
        <Button onClick={() => handleOpen("login") } variant="text" color="primary" className=" font-semibold" sx={{ p: 0 }}  >

          Login</Button>
      </div> */}
      <AuthModal
        open={openAuthModal}
        handleClose={handleClose}
        mode={mode} // Pass the mode prop to AuthModal
        LoginFormComponent={LoginForm}
      />
    </div>
  )
}

export default RegisterForm