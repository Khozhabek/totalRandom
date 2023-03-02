import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce(
        (acc, item) => acc + item.price * item.count,
        0,
      );
    },
    subtructItem: (state, action) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (acc, item) => acc + item.price * item.count,
        0,
      );
    },
    clearItem: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cartSlice;
export const selectCartById = (id) => (state) =>
state.cartSlice.items.find((item) => item.id === id);

export const { addItem, removeItem, subtructItem, clearItem } =
  cartSlice.actions;

export default cartSlice.reducer;