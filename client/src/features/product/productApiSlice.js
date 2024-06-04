import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

// find products
export const findProducts = createAsyncThunk(
  "/api/products/findProducts",
  async (data) => {
    const {
      colors,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      maxDiscount,
      category,
      stock,
      sort,
      pageNumber,
      pageSize,
    } = data;

    console.log(data);
    try {
      const response = await API.get(
        `/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&maxDiscount=${maxDiscount}&pageNumber=${pageNumber}&pageSize=${pageSize}&category=${category}&stock=${stock}&sort=${sort}`
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// find single products
export const findSingleProducts = createAsyncThunk(
  "/api/products/findSingleProducts",
  async (data) => {
    const { productId } = data;
    try {
      const response = await API.get(`/api/products/id${productId}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
