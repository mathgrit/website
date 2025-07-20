// Lokasi: app/layout.tsx

import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer'; // <-- 1. Impor komponen Footer
import './globals.css';
import 'katex/dist/katex.min.css';

export const metadata: Metadata = {
  title: {
    template: '%s - MathGrit',
    default: 'MathGrit - Immersive Math Learning',
  },
  description: 'Master mathematics through interactive lessons, adaptive quizzes, and challenging contest problems.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-[#0d1b2a] dark:to-[#1b263b] transition-colors duration-300 flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer /> {/* <-- 2. Tambahkan komponen Footer di sini */}
          </div>
        </Providers>
      </body>
    </html>
  );
}