import { Grid, TextField, Button,OutlinedInput,InputLabel,FormControl,InputAdornment,IconButton } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { signInPending, signInRejected, signInSuccess } from "../../features/auth/authSlice";


const LoginForm = () => {
  const navigate = useNavigate()
  // const [errorMsg, setErrorMsg] = useState(null)
  
  const [input, setInput] = useState({
    auth: "",
    password: "",
})
const dispatch = useDispatch()
const { loader, error } = useSelector((state) => state.user)

const handleInputChange = (e) => {
  setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
  }))
}
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(signInPending)
    // Using axios for the POST request

    const res = await axios.post('http://localhost:5454/auth/login', input);
    dispatch(signInSuccess(res.data))
    navigate("/product")


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
            <Button type="submit" className=" w-full " variant="contained" color="primary" size="large">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
<p> {error && error.data.message} </p>
      <div className="form-footer flex gap-1 align-middle justify-center mt-3">
        <p>{`If you don't have account?`}</p>
        <Button onClick={()=>navigate("/register")} variant="text" color="primary" className=" font-semibold" sx={{ p: 0 }}  >

          Register</Button>
      </div>
    </div>
  )
}

export default LoginForm