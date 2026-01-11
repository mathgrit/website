"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/contexts/theme-context";
import { AuthProvider } from "@/contexts/auth-context";
import { ProgressProvider } from "@/contexts/progress-context";
// import LoadingTransition... (HAPUS IMPORT INI)

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          {/* HAPUS LoadingTransition DARI SINI */}
          
          {children} 
          
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}