import { Grid, TextField, Button,OutlinedInput,InputLabel,FormControl,InputAdornment,IconButton } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const RegisterForm = () => {

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget)

    const userData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),

    }
    console.log(userData);
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
              id="firstName"
              label="First Name"
              required
              name="firstName"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField
              id="lastName"
              label="Last Name"
              required
              name="lastName"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} >
            <TextField
              id="email"
              label="Email"
              required
              name="email"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} >
          <FormControl xs={12} className=" w-full ">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
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
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="form-footer flex gap-1 align-middle justify-center mt-3">
        <p>Already have an account?</p>
        <Button onClick={()=>navigate("/login")} variant="text" color="primary" className=" font-semibold" sx={{ p: 0 }}  >

          Login</Button>
      </div>
    </div>
  )
}

export default RegisterForm