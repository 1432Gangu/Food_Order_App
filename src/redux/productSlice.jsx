import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: { products: [] }, // Initial state with products array
  reducers: {
    setProducts(state, action) {
      state.products = action.payload; // Sets the list of products
    },
    addProduct(state, action) {
      state.products.push(action.payload); // Adds a new product to the list
    },
  },
});

export const { setProducts, addProduct } = productSlice.actions;
export default productSlice.reducer;


