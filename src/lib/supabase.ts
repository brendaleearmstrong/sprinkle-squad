import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export const isSupabaseConfigured = () => {
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL and Anon Key must be defined in environment variables');
    return false;
  }
  return true;
};