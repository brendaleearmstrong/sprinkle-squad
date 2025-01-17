import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://xomqvvduvaialpynwyhe.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvbXF2dmR1dmFpYWxweW53eWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMDcxODEsImV4cCI6MjA1MjU4MzE4MX0.07o6WxOk6FK-jR11DRvPXeZlbvO3_EIQFpLFv0yhLu0";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const isSupabaseConfigured = () => {
  return true; // We now have hardcoded values
};