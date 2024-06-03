import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./authApiSlice";

// create auth slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("loginUser")
      ? JSON.parse(localStorage.getItem("loginUser"))
      : null,
    message: null,
    error: false,
    loader: false,
    loginState: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      (state.error = null), (state.message = null);
    },
  },
  extraReducers: (builder) => {
    builder
    // register extra reducers
      .addCase(register.pending, (state) => {
        state.loader = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      // login
      .addCase(login.pending, (state) => {
        state.loader = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.user = action.payload.user;
        localStorage.setItem("loginUser", JSON.stringify(action.payload.user));
      })
      // logout
      .addCase(logout.pending, (state) => {
        state.loader = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("loginUser");
      });
  },
});

// selector
export const authSelector = (state) => state.auth;
export const userSelector = (state) => state.user;
// actions
export const { setMessageEmpty } = userSlice.actions;

// reducer
export default userSlice.reducer;
