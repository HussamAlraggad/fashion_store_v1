"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      if (data.user) {
        sessionStorage.setItem("auth_user", JSON.stringify(data.user));
        sessionStorage.setItem("age_verified", "true");
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-ivory px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/">
            <h1 className="font-display text-2xl tracking-wider text-luxury-charcoal">
              MAISON<span className="text-luxury-gold"> FOURRURE</span>
            </h1>
          </Link>
          <p className="font-body text-xs text-luxury-gray mt-2 tracking-wider uppercase">
            Sign In to Your Account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-luxury-gray mb-1 font-body">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-luxury-gray mb-1 font-body">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="••••••••" />
          </div>
          {error && <p className="text-red-500 font-body text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Signing In…" : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6 font-body text-sm text-luxury-gray">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-luxury-gold hover:text-luxury-charcoal transition-colors">Create One</Link>
        </p>

        <div className="mt-8 p-4 bg-luxury-cream border border-luxury-gray/10">
          <p className="text-xs uppercase tracking-wider text-luxury-gray font-body mb-2">Demo Accounts</p>
          <div className="space-y-1 text-xs font-body text-luxury-gray-dark">
            <p>Admin: admin@fashionstore.com / admin123</p>
            <p>Customer: elena.voss@example.com / customer123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
