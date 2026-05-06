import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './api/authApi';
import { orderApi } from './api/orderApi';
import { productApi } from './api/productApi';
import { userApi } from './api/userApi';
import { couponApi } from './api/couponApi';
import { enquiryApi } from './api/enquiryApi';
import { websiteSettingsApi } from './api/websiteSettingsApi';
import cartReducer from './slices/cartSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    // Slices
    cart: cartReducer,
    users: usersReducer,
    
    // RTK Query APIs
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [enquiryApi.reducerPath]: enquiryApi.reducer,
    [websiteSettingsApi.reducerPath]: websiteSettingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      orderApi.middleware,
      productApi.middleware,
      userApi.middleware,
      couponApi.middleware,
      enquiryApi.middleware,
      websiteSettingsApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
