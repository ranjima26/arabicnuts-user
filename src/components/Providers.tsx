'use client';

import { ReduxProvider } from "../redux/provider";
import { ToastContainer } from 'react-toastify';
import { app } from "@/lib/firebase";
import 'react-toastify/dist/ReactToastify.css';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      {children}
      <ToastContainer/>
    </ReduxProvider>
  );
}
