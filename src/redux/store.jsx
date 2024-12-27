// import { configureStore } from "@reduxjs/toolkit";
// import cartSlice from "./cartSlice";
// import productSlice from "./productSlice";

// const store = configureStore({
//     reducer:{
//         cart: cartSlice,
//         product: productSlice,
//     }
// })

// export default store


import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Import your cart slice
import productReducer from "./productSlice"; // Import your product slice

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add cart slice to the store
    product: productReducer, // Add product slice to the store
  },
});

export default store;
