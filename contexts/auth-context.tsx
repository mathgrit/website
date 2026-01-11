"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { createClient } from '@supabase/supabase-js'

// Impor tipe User gabungan dari file terpusat
import type { User } from "@/data/types";

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoading: boolean
}

// Gunakan fallback string kosong agar tidak error saat build jika env belum ada
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Cek session saat pertama kali mount
    const initializeAuth = async () => {
      try {
        // Cek session yang ada (bisa dari local storage)
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
             // Logic yang sama untuk mengambil profile
             const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (!profileError && profileData) {
               setUser({ ...session.user, ...profileData } as User);
            } else {
               setUser(session.user as User);
            }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        // PENTING: Apapun yang terjadi (error/sukses), matikan loading
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listener untuk perubahan auth (Login/Logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user;

      if (currentUser) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (profileError) {
          console.error("Gagal mengambil profil:", profileError);
          setUser(currentUser as User);
        } else {
          setUser({ ...currentUser, ...profileData } as User);
        }
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    isLoading,
    signIn: async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    },
    signUp: async (name: string, email: string, password: string) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name }
        }
      });
      if (error) throw error;
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {/* PERBAIKAN UTAMA DI SINI: */}
      {/* Kita menghapus logic '!isLoading &&' agar website SELALU dirender */}
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}