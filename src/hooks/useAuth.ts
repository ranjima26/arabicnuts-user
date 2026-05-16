'use client';

import { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/slices/usersSlice';
import { resetCart, setCartItems } from '@/redux/slices/cartSlice';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.users?.user);
  const prevUserRef = useRef(user);

  useEffect(() => {
    prevUserRef.current = user;
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
   
        try {
          const res = await fetch('/api/auth/firebase-sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: firebaseUser.email,
              name: firebaseUser.displayName,
              image: firebaseUser.photoURL,
              uid: firebaseUser.uid,
            }),
          });
          const data = await res.json();
          if (data.success && data.user) {
            dispatch(setUser(data.user));
            
            // Merge local cart with database cart
            const dbCart = data.user.cartItems || [];
            const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
            
      
            const mergedCart = [...dbCart];
            
            localCart.forEach((localItem: any) => {
              const existingItemIndex = mergedCart.findIndex(dbItem => dbItem._id === localItem._id);
              if (existingItemIndex > -1) {

              } else {
                mergedCart.push(localItem);
              }
            });
            
            dispatch(setCartItems(mergedCart));
          }
        } catch (err) {
          console.error("Auth sync failed", err);
        }
      } else {
        dispatch(setUser(null));
        dispatch(resetCart());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { user, loading };
}
