'use client';

import { ReduxProvider } from "../redux/provider";

import { Toaster } from 'sonner';
import { app } from "@/lib/firebase";


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      {children}

      <Toaster position="top-center" richColors />
    </ReduxProvider>
  );
}
