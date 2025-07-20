"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { createClient, type User as SupabaseUser } from '@supabase/supabase-js'

// Impor tipe User gabungan dari file terpusat
import type { User } from "@/data/types";

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoading: boolean
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // onAuthStateChange adalah satu-satunya sumber kebenaran untuk status auth.
    // Ia akan berjalan saat halaman dimuat, saat login, logout, dll.
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user;

      if (currentUser) {
        // Jika pengguna login, ambil data profilnya dari tabel 'profiles'
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (profileError) {
          console.error("Gagal mengambil profil:", profileError);
          // Jika profil gagal diambil, setidaknya set user dasar dari auth
          setUser(currentUser as User);
        } else {
          // Jika berhasil, gabungkan data auth dan data profil
          setUser({ ...currentUser, ...profileData });
        }
      } else {
        // Jika pengguna tidak login (logout)
        setUser(null);
      }
      
      // Selesai memuat status autentikasi
      setIsLoading(false);
    });

    // Membersihkan listener saat komponen tidak lagi digunakan
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
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
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