import { createSlice } from "@reduxjs/toolkit";
import { findProducts, findSingleProducts } from "./productApiSlice";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: null,
    loader: false,
    error: null,
    message: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      (state.error = null), (state.message = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findProducts.pending, (state) => {
        state.loader = true;
      })
      .addCase(findProducts.rejected, (state,action) => {
        state.loader = false;
        state.error = action.error.message
      })
      .addCase(findProducts.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.products = action.payload;
      })      .addCase(findSingleProducts.pending, (state) => {
        state.loader = true;
      })
      .addCase(findSingleProducts.rejected, (state,action) => {
        state.loader = false;
        state.error = action.error.message
      })
      .addCase(findSingleProducts.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.products = action.payload;
      });
  },
});

// selector
export const userSelector = (state) => state.user;

// actions
export const { setMessageEmpty } = productSlice.actions;

// reducer
export default productSlice.reducer;
