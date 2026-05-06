import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  orders: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  status: 'idle',
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<any[]>) => {
      state.orders = action.payload;
      state.status = 'succeeded';
    },
    addOrder: (state, action: PayloadAction<any>) => {
      state.orders.unshift(action.payload);
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setOrders, addOrder, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;
