import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
      "products/fetchProducts",
      async ()=>{
        const res = await axios.get("https://fakestoreapi.com/products");
        return res.data;
      }
);
const productSlice = createSlice({
    name:"products",
    initialState:{
    items: [],
    loading: false,
    error: null,
    },
    extraReducers : (builder) =>{
        builder
        .addCase(fetchProducts.pending, (state)=>{
            state.loading =true;
            state.error = null;
        })
        .addCase(fetchProducts.rejected , (state , action)=>{
            state.loading =false;
            state.error=action.error.message;
        })
        .addCase(fetchProducts.fulfilled, (state, action )=>{
            state.loading = false;
            state.items = action.payload;
        })
    }
});
export default productSlice.reducer;