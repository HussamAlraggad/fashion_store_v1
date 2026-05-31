"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"age" | "account">("age");

  function calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  }

  function handleAgeVerify() {
    const { birthDay, birthMonth, birthYear } = form;
    if (!birthDay || !birthMonth || !birthYear) {
      setError("Please enter your full date of birth.");
      return;
    }
    const d = parseInt(birthDay, 10);
    const m = parseInt(birthMonth, 10);
    const y = parseInt(birthYear, 10);
    if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > new Date().getFullYear()) {
      setError("Please enter a valid date of birth.");
      return;
    }
    const age = calculateAge(new Date(y, m - 1, d));
    if (age < 18) {
      setError("You must be 18 or older to create an account.");
      return;
    }
    setError("");
    setStep("account");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const birthdate = `${form.birthYear}-${String(parseInt(form.birthMonth)).padStart(2, "0")}-${String(parseInt(form.birthDay)).padStart(2, "0")}`;
      const mockUser = { id: `usr-${Date.now()}`, name: form.name, email: form.email, role: "customer" as const, birthdate, ageVerified: true };
      sessionStorage.setItem("auth_user", JSON.stringify(mockUser));
      sessionStorage.setItem("age_verified", "true");
      sessionStorage.setItem("age_birthdate", birthdate);
      router.push("/");
      router.refresh();
    } catch {
      setError("Registration failed. Please try again.");
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
            {step === "age" ? "Age Verification Required" : "Create Your Account"}
          </p>
        </div>

        {step === "age" ? (
          <div className="space-y-5">
            <p className="font-body text-sm text-luxury-gray text-center leading-relaxed">
              You must be <strong>18 or older</strong> to create an account. Please enter your date of birth.
            </p>
            <div className="flex gap-3">
              {[
                { label: "Day", key: "birthDay", placeholder: "DD", max: 31 },
                { label: "Month", key: "birthMonth", placeholder: "MM", max: 12 },
                { label: "Year", key: "birthYear", placeholder: "YYYY", max: null },
              ].map((field) => (
                <div key={field.key} className="flex-1">
                  <label className="block text-xs tracking-wider text-luxury-gray uppercase mb-1 font-body">{field.label}</label>
                  <input
                    type="number"
                    min={1}
                    max={field.max ?? undefined}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="input-field text-center"
                  />
                </div>
              ))}
            </div>
            {error && <p className="text-red-500 font-body text-sm text-center">{error}</p>}
            <button onClick={handleAgeVerify} className="btn-primary w-full">Verify Age</button>
            <p className="text-center mt-4">
              <Link href="/auth/login" className="font-body text-sm text-luxury-gold hover:text-luxury-charcoal transition-colors">
                Already have an account? Sign In
              </Link>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-luxury-gray mb-1 font-body">Full Name</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Your full name" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-luxury-gray mb-1 font-body">Email</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-luxury-gray mb-1 font-body">Password</label>
              <input type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-field" placeholder="At least 6 characters" />
            </div>
            {error && <p className="text-red-500 font-body text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Creating Account…" : "Create Account"}
            </button>
            <p className="text-center font-body text-sm text-luxury-gray">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-luxury-gold hover:text-luxury-charcoal transition-colors">Sign In</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
