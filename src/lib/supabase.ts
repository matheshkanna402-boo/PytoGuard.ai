import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy-initialized clients (avoids crash during build when env vars aren't available)
let _supabase: SupabaseClient | null = null;

export function getSupabase() {
    if (!_supabase) {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!url || !key) {
            throw new Error('Missing Supabase environment variables');
        }
        _supabase = createClient(url, key);
    }
    return _supabase;
}

export function createServiceClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
        throw new Error('Missing Supabase environment variables');
    }
    return createClient(url, key);
}
