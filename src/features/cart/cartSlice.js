import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of { id, title, price, image, quantity }
  totalQuantity: 0,
  totalAmount: 0,
};


const calculateTotals = (state) => {
  state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
  state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  state.totalAmount = parseFloat(state.totalAmount.toFixed(2));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action: Add Item
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      console.log('Cart Slice: Adding item:', newItem.title);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          image: newItem.main_image_url || newItem.image || null, // Handle both naming conventions if needed
          price: newItem.price,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
        console.log('Cart Slice: Item exists, incrementing quantity.');
      }
      
      calculateTotals(state);
      console.log('Cart Slice: New Total Amount:', state.totalAmount);
    },

    // Action: Remove Item completely
    removeFromCart: (state, action) => {
      const id = action.payload;
      console.log('Cart Slice: Removing item ID:', id);
      state.items = state.items.filter((item) => item.id !== id);
      calculateTotals(state);
    },

    // Action: Update Quantity (+ or -)
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        console.log(`Cart Slice: Updating quantity for ${existingItem.title} to ${quantity}`);
        if (quantity > 0) {
          existingItem.quantity = quantity;
        } else {
          // If quantity is 0, remove item (optional logic, but standard behavior)
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
      calculateTotals(state);
    },

    // Action: Clear Cart (e.g., after Checkout)
    clearCart: (state) => {
      console.log('Cart Slice: Clearing cart...');
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          // If quantity goes to 0, remove it
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
      calculateTotals(state);
    },

    // Action: Set Cart (Used when loading from Firebase)
    setCart: (state, action) => {
      console.log('Cart Slice: Loading cart from database:', action.payload);
      state.items = action.payload;
      calculateTotals(state);
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;