import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [], 
    currentUserId: null, 
  },
  reducers: {
    
    setCurrentUser: (state, action) => {
      state.currentUserId = action.payload;
    },

    addToCart: (state, action) => {
      const userCart = state.carts.find(c => c.userId === state.currentUserId);

      if (userCart) {
        const existing = userCart.products.find(p => p.id === action.payload.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          userCart.products.push({ ...action.payload, quantity: 1 });
        }
      } else {
        state.carts.push({
          userId: state.currentUserId,
          products: [{ ...action.payload, quantity: 1 }]
        });
      }
    },

    removeFromCart: (state, action) => {
      const userCart = state.carts.find(c => c.userId === state.currentUserId);
      if (userCart) {
        userCart.products = userCart.products.filter(p => p.id !== action.payload);
      }
    },

    increaseQuantity: (state, action) => {
      const userCart = state.carts.find(c => c.userId === state.currentUserId);
      if (userCart) {
        const product = userCart.products.find(p => p.id === action.payload);
        if (product) product.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const userCart = state.carts.find(c => c.userId === state.currentUserId);
      if (userCart) {
        const product = userCart.products.find(p => p.id === action.payload);
        if (product && product.quantity > 1) product.quantity -= 1;
      }
    },

    clearCart: (state) => {
      const userCart = state.carts.find(c => c.userId === state.currentUserId);
      if (userCart) userCart.products = [];
    },
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart,
  setCurrentUser 
} = cartSlice.actions;

export default cartSlice.reducer;