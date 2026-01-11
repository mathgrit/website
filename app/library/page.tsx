"use client"; // Opsional, tapi baik untuk penanda di Next.js App Router

import dynamic from "next/dynamic";

// Ubah import statis menjadi dynamic import dengan ssr: false
const LibraryPage = dynamic(
  () => import("@/components/pages/library"), 
  { 
    ssr: false, // <-- INI SOLUSINYA: Jangan render di server (Node.js)
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-500">Memuat Perpustakaan...</div>
      </div>
    ),
  }
);

export default function Page() {
  return <LibraryPage />;
}