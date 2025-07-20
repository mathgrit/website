// Lokasi: components/footer.tsx

import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram, X, Telescope, Phone, PhoneCall, PhoneCallIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white/50 dark:bg-[#1b263b]/50 backdrop-blur-sm border-t border-gray-200 dark:border-[#415a77]/30">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Kolom 1: Logo */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">∞</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                MathGrit
              </span>
            </Link>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
              Mastering mathematics through immersive learning.
            </p>
          </div>
          
          {/* Kolom 2: Navigate */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Navigate</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/lessons" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Lessons</Link></li>
              <li><Link href="/quizzes" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Quizzes</Link></li>
              <li><Link href="/problems" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Problems</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/about" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">About</Link></li>
              <li><Link href="/privacy" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms</Link></li>
            </ul>
          </div>
          
          {/* PERUBAHAN: Kolom 4: Kontak (baru) */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Contact</h3>
            {/* Ikon sosial media dipindahkan ke sini */}
            <div className="flex space-x-6 mt-4">
              <a href="#" className="text-gray-400 hover:text-gray-500"><Instagram className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><Phone className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><Linkedin className="h-6 w-6" /></a>
            </div>
          </div>
          
        </div>
        
        {/* PERUBAHAN: Bagian Copyright di tengah */}
        <div className="mt-8 border-t border-gray-200 dark:border-[#415a77]/30 pt-8 flex items-center justify-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} MathGrit. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}