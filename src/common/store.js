import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/auth/userSlice';
import cartReducer from '../features/cart/cartSlice';

console.log('Redux Store: Initializing...');

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

console.log('Redux Store: Initialized successfully.');   