import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export default function Login() {
  const { user, signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup" | "setup">("signin");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (mode === "setup") {
      // Create admin via backend (auto-confirmed)
      try {
        const res = await fetch(`${API_URL}/auth/setup-admin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.error || "Failed to create admin");
        } else {
          // Keep dev bypass token in sync with AuthContext localStorage check
          if (data?.token === "local-dev") {
            localStorage.setItem("token", "local-dev");
            toast.success("Admin created! Local dev login bypass enabled.");
            navigate("/dashboard");
            return;
          }

          toast.success(data.message || "Admin created! You can now sign in.");
          setMode("signin");
        }
      } catch (err: any) {
        toast.error(err.message || "Network error");
      }
      setSubmitting(false);
      return;
    }

    const { error } = mode === "signin"
      ? await signIn(email, password)
      : await signUp(email, password);
    setSubmitting(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    if (mode === "signup") {
      toast.success("Account created. Check your email to confirm, then sign in.");
      setMode("signin");
    } else {
      toast.success("Signed in");
      navigate("/dashboard");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Admin Setup"}
          </CardTitle>
          <CardDescription>
            {mode === "signin"
              ? "Welcome back"
              : mode === "signup"
              ? "Sign up with your email and password"
              : "Create your admin account (auto-confirmed, no email needed)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting
                ? "Please wait..."
                : mode === "signin"
                ? "Sign in"
                : mode === "signup"
                ? "Sign up"
                : "Create Admin Account"}
            </Button>

            <div className="flex flex-col gap-2 text-sm text-center">
              {mode !== "signin" && (
                <button type="button" onClick={() => setMode("signin")} className="text-primary hover:underline">
                  ← Back to Sign in
                </button>
              )}
              {mode !== "signup" && mode !== "setup" && (
                <>
                  <button type="button" onClick={() => setMode("signup")} className="text-muted-foreground hover:text-primary hover:underline">
                    No account? Sign up
                  </button>
                  <button type="button" onClick={() => setMode("setup")} className="text-primary font-medium hover:underline">
                    🔧 First time? Setup Admin Account
                  </button>
                </>
              )}
            </div>

            <p className="text-sm text-center">
              <Link to="/" className="text-muted-foreground hover:text-primary">← Back to home</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}