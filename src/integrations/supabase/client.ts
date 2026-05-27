import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fallback to old variable name for backwards compatibility
const effectiveKey = SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const createFallbackAuth = () => ({
  async getSession() {
    return { data: { session: null } };
  },
  onAuthStateChange(_: any, callback: any) {
    callback("INITIAL", null);
    return { data: { subscription: { unsubscribe: () => {} } } };
  },
  async signInWithPassword() {
    return { error: new Error("Supabase is not configured") };
  },
  async signUp() {
    return { error: new Error("Supabase is not configured") };
  },
  async signOut() {
    return { error: new Error("Supabase is not configured") };
  },
});

const createFallbackQuery = () => {
  const chain: any = {
    select: async () => ({ data: null, error: new Error("Supabase is not configured") }),
    maybeSingle: async () => ({ data: null, error: new Error("Supabase is not configured") }),
    single: async () => ({ data: null, error: new Error("Supabase is not configured") }),
    insert: () => chain,
    update: () => chain,
    delete: () => chain,
    eq: () => chain,
    order: () => chain,
  };
  return chain;
};

let supabase: any;

if (!SUPABASE_URL || !effectiveKey) {
  console.warn(
    '[Supabase] Missing environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file'
  );
  supabase = {
    auth: createFallbackAuth(),
    from: () => createFallbackQuery(),
  };
} else {
  supabase = createClient<any>(
    SUPABASE_URL,
    effectiveKey,
    {
      auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
      }
    }
  );
}

export { supabase };

