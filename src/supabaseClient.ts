import { createClient } from '@supabase/supabase-js'

export function createSupabaseClient(supabaseProjectUrl: string, supabaseAnonKey: string) {
    return createClient(supabaseProjectUrl, supabaseAnonKey)
}
