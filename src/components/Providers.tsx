'use client';

import { ReduxProvider } from "../redux/provider";
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'sonner';
import { app } from "@/lib/firebase";
import 'react-toastify/dist/ReactToastify.css';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      {children}
      <ToastContainer/>
      <Toaster position="top-center" richColors />
    </ReduxProvider>
  );
}
