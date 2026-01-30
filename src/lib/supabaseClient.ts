import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase client instance.
 * Uses environment variables SUPABASE_PROJECT_URL and SUPABASE_ANON_KEY.
 * This client is intended for server-side use only.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing SUPABASE_PROJECT_URL or SUPABASE_ANON_KEY environment variables');
    }

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
}
