import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  _id: string;
  productId?: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  variant?: any;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'PROCESSING' | 'DELIVERED';
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
  };
}

interface CartState {
  cartItems: CartItem[];
  shippingAddress: any;
  paymentMethod: string;
  buyNowItem: CartItem | null;
  orders: Order[];
}

const getInitialOrders = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

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
  orders: getInitialOrders(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      
      // Create a unique cart item ID based on product ID and variant size
      const uniqueId = item.productId 
        ? item._id 
        : `${item._id}${item.variant?.size ? '-' + item.variant.size : ''}`;
      
      const itemWithUniqueId = { ...item, _id: uniqueId, productId: item.productId || item._id };
      
      const existItem = state.cartItems.find((x) => x._id === uniqueId);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === uniqueId
            ? { ...itemWithUniqueId, qty: x.qty + item.qty }  // accumulate qty
            : x
        );
      } else {
        state.cartItems.push(itemWithUniqueId);
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
    createOrder: (state, action: PayloadAction<Omit<Order, 'id' | 'date' | 'status'>>) => {
      const newOrder: Order = {
        ...action.payload,
        id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'PROCESSING'
      };
      state.orders = [newOrder, ...state.orders];
      localStorage.setItem('orders', JSON.stringify(state.orders));
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
  createOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
