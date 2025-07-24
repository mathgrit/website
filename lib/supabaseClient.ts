// Lokasi: lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'

// Ambil URL dan Kunci Anon dari environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Buat satu instance client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)