"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/contexts/theme-context";
import { AuthProvider } from "@/contexts/auth-context";
import { ProgressProvider } from "@/contexts/progress-context";
// import { AnimatePresence } from "framer-motion"; // <-- BIARKAN MATI DULU
import LoadingTransition from "@/components/loading-transition"; // <-- Nyalakan ini

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          
          {/* 👇 NYALAKAN INI (Aman karena dia overlay terpisah) */}
          <LoadingTransition /> 
          
          {/* 👇 BIARKAN INI MATI (Ini biang kerok layar hitam permanen) */}
          {/* <AnimatePresence mode="wait"> */}
            {children}
          {/* </AnimatePresence> */}

        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}