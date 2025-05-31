import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './redux/cartSlice';
import authReducer from './redux/authSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer

  },
});

export default store;