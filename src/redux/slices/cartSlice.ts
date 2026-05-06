import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
}

interface CartState {
  cartItems: CartItem[];
  shippingAddress: any;
  paymentMethod: string;
  buyNowItem: CartItem | null;
}

const getInitialCartItems = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const getInitialShippingAddress = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('shippingAddress');
    return saved ? JSON.parse(saved) : {};
  }
  return {};
};

const getInitialBuyNowItem = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('buyNowItem');
    return saved ? JSON.parse(saved) : null;
  }
  return null;
};

const initialState: CartState = {
  cartItems: getInitialCartItems(),
  shippingAddress: getInitialShippingAddress(),
  paymentMethod: 'PayPal',
  buyNowItem: getInitialBuyNowItem(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action: PayloadAction<any>) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
    setBuyNowItem: (state, action: PayloadAction<CartItem | null>) => {
      state.buyNowItem = action.payload;
      if (action.payload) {
        localStorage.setItem('buyNowItem', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('buyNowItem');
      }
    },
    clearBuyNowItem: (state) => {
      state.buyNowItem = null;
      localStorage.removeItem('buyNowItem');
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  setBuyNowItem,
  clearBuyNowItem,
} = cartSlice.actions;

export default cartSlice.reducer;
