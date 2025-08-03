"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";
import { useAuth } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // --- PERUBAHAN: Menambahkan kembali "Exams" dan "Library" ---
  const loggedInNavItems = [
    { name: "Lessons", path: "/lessons" },
    { name: "Quizzes", path: "/quizzes" },
    { name: "Exams", path: "/exams" },
    { name: "Problems", path: "/problems" },
    { name: "Library", path: "/library" },
  ];

  const loggedOutNavItems = [
    { name: "Lessons", path: "/lessons" },
    { name: "Quizzes", path: "/quizzes" },
    { name: "Exams", path: "/exams" },
    { name: "Problems", path: "/problems" },
    { name: "About", path: "/about" },
  ];
  // ----------------------------------------------------

  const navItems = user ? loggedInNavItems : loggedOutNavItems;
  const logoPath = user ? "/dashboard" : "/";
  
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY <= 10) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <motion.nav
      className="fixed top-0 z-50 w-full backdrop-blur-sm bg-white/80 dark:bg-[#0d1b2a]/80 border-b border-gray-200 dark:border-[#415a77]/30"
      animate={{ y: visible ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={logoPath} className="flex items-center space-x-2 group">
            <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200">
              ∞
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors">
              MathGrit
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? "text-blue-600 dark:text-cyan-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400"
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-cyan-400"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="hidden sm:block text-gray-900 dark:text-white">{user.full_name || user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/signin">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-700">
                  Sign In
                </Button>
              </Link>
            )}

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-[#415a77]/30"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    pathname === item.path
                      ? "text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-[#415a77]/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-[#415a77]/10"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}