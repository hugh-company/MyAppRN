import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DomainAvailability} from '@types';

interface CartState {
  items: DomainAvailability[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<DomainAvailability>) {
      const item = action.payload;
      // Use domain as the unique identifier
      const domainKey = item.domain;
      const existingItem = state.items.find(i => i.domain === domainKey);
      if (existingItem) {
        existingItem.quantity =
          (existingItem.quantity || 1) + (item.quantity || 1);
      } else {
        state.items.push({
          ...item,
          quantity: item.quantity || 1,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      // Remove using domain as identifier
      state.items = state.items.filter(i => i.domain !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
