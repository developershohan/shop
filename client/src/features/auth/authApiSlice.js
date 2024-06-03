import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";



// register
export const register = createAsyncThunk("auth/register", async (data) => {
  try {
    const response = await API.post("/auth/register", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});


// login
export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await API.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// logout
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await API.post("/auth/logout", );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
