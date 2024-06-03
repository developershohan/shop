import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

export const register = createAsyncThunk("auth/register", async (data) => {
  try {
    const response = await API.post("/auth/register", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
