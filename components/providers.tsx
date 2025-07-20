"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/contexts/theme-context";
import { AuthProvider } from "@/contexts/auth-context";
import { ProgressProvider } from "@/contexts/progress-context";
import { AnimatePresence } from "framer-motion";
import LoadingTransition from "@/components/loading-transition"; // <-- Diimpor di sini

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <LoadingTransition /> {/* <-- Diletakkan di sini */}
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}