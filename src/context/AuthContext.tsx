import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const localToken = localStorage.getItem("token");
  
  if (localToken === "local-dev") {
    setUser({
      id: "00000000-0000-0000-0000-000000000000",
      email: "qamar@gmail.com",
      user_metadata: { role: "admin" },
      app_metadata: { role: "admin" },
    } as any);
    setSession({ access_token: "local-dev" } as any);
    setLoading(false);
    return; 
  }

  // Combine the initial load check inside the listener
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
    if (localStorage.getItem("token") !== "local-dev") {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false); // <--- Make sure loading turns false here!
    }
  });

  return () => subscription.unsubscribe();
}, []);

  // Admin check: hardcoded emails OR user metadata role === 'admin'
  const adminEmails = ["sheikhuqamar@gmail.com", "admin@zeshandryfruit.com", "qamar@gmail.com"];
  const isAdmin = user
    ? adminEmails.includes(user.email ?? "") || user.user_metadata?.role === 'admin' || user.app_metadata?.role === 'admin'
    : false;

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const anyErr: any = error;
      console.error("[Auth] signInWithPassword error:", {
        message: anyErr?.message,
        name: anyErr?.name,
        status: anyErr?.status,
        error_description: anyErr?.error_description,
        error_code: anyErr?.code,
        raw: anyErr,
      });
    }

    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    return { error };
  };

  const signOut = async () => {
    // 1. Clean out the local bypass token so it doesn't log you right back in
    localStorage.removeItem("token");
    
    // 2. Clear local states
    setUser(null);
    setSession(null);

    // 3. Inform Supabase client to log out safely
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.log("Supabase already logged out locally");
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}