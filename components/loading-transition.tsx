"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingTransition() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Aktifkan loading setiap kali rute/halaman berubah
    setIsLoading(true);

    // Matikan loading setelah 1.2 detik
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [pathname]); // <-- Akan jalan saat ganti halaman ATAU saat refresh pertama kali

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          // Z-index saya naikkan ke 9999 biar paling atas
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/50 dark:bg-[#0d1b2a]/95 backdrop-blur-sm"
        >
          {/* Bar loading di atas */}
          <motion.div
            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 z-[10000]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            style={{ transformOrigin: "left" }}
          />

          {/* Logo yang berputar di tengah */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center space-x-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
              }}
              className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              ∞
            </motion.div>
            
            <span className="text-5xl font-bold text-gray-900 dark:text-white">
              MathGrit
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}