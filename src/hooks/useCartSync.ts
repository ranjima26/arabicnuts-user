'use client';

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export function useCartSync() {
  const { cartItems } = useSelector((state: any) => state.cart);
  const { user } = useSelector((state: any) => state.users);
  useEffect(() => {
    const syncCart = async () => {
      if (user && cartItems) {
        try {
          await fetch('/api/cart/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItems }),
          });
        } catch (error) {
          console.error('Failed to sync cart to database:', error);
        }
      }
    };


    const timeoutId = setTimeout(syncCart, 500);
    return () => clearTimeout(timeoutId);
  }, [cartItems, user]);
}
