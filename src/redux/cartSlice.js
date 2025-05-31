import { createSlice } from "@reduxjs/toolkit";

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { cartItems: [], total: 0 };
  } catch (error) {
    return { cartItems: [], total: 0 };
  }
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cartState) => {
  localStorage.setItem("cart", JSON.stringify(cartState));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product._id === product._id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ product, quantity });
      }

      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      saveCartToStorage(state);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.product._id !== productId
      );
      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      saveCartToStorage(state);
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.cartItems.find(
        (item) => item.product._id === productId
      );
      if (item) {
        item.quantity += 1;
        state.total = state.cartItems.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
        saveCartToStorage(state);
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.cartItems.find(
        (item) => item.product._id === productId
      );
      if (item) {
        item.quantity = Math.max(1, item.quantity - 1);
        state.total = state.cartItems.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
        saveCartToStorage(state);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  incrementQuantity, 
  decrementQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;