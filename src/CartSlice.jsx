import { createSlice } from '@reduxjs/toolkit';
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [

    ],
   // Initialize items as an empty array
   addedToCart: {}, // Initialize addedToCart as an empty object
  },
  reducers: {
    addItem: (state, action) => {
      console.log("Adding item to cart:", action.payload);
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);

      if (existingItem) {
        // If the item already exists in the cart, increase its quantity
        existingItem.quantity +=1;
      } else {
        // If the item does not exist, add it to the cart
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1, // Default quantity to 1 if not provided
        });
      }
      state.addedToCart[newItem.name] = true // Increment the count in addedToCart
    
    },
    removeItem: (state, action) => {
      const itemName = action.payload;
      state.items = state.items.filter(item => item.name !== itemName);
      delete state.addedToCart[itemName]; 
      
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);

      if (item) {
        // Update the quantity of the item if it exists
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          // If quantity is 0 or less, remove the item from the cart
          state.items = state.items.filter(item => item.name !== name);
          delete state.addedToCart[name];
        }
      }

    
    },
  },
  resetAddedToCart: (state) => {
    state.addedToCart = {};
  }
});

export const { addItem, removeItem, updateQuantity, resetAddedToCart } = CartSlice.actions;

export default CartSlice.reducer;
