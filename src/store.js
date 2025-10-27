import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../src/features/productsSlice";
import cartReducer from "../src/features/cartSlice";
import userReducer from "../src/features/userSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
