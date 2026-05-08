'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/slices/usersSlice';
import { clearCartItems } from '@/redux/slices/cartSlice';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.users?.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Sync with backend if needed or just set local state
        // For now, we'll assume the sync happens during login
        // But we might want to fetch the DB user here to get the role
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
          if (data.success) {
            dispatch(setUser(data.user));
          }
        } catch (err) {
          console.error("Auth sync failed", err);
        }
      } else {
        dispatch(setUser(null));
        dispatch(clearCartItems());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { user, loading };
}
