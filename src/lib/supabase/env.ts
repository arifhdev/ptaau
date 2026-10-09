export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

// Situs tetap bisa dibangun & tampil dengan data bawaan selama env belum diisi.
export const hasSupabase = Boolean(supabaseUrl && supabaseKey);
