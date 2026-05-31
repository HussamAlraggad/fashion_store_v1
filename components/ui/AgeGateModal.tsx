"use client";

import { useState } from "react";

interface AgeGateModalProps {
  onVerified: () => void;
}

export default function AgeGateModal({ onVerified }: AgeGateModalProps) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  function calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  function handleVerify() {
    setError("");

    if (!day || !month || !year) {
      setError("Please enter your full date of birth.");
      return;
    }

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > new Date().getFullYear()) {
      setError("Please enter a valid date of birth.");
      return;
    }

    const birthDate = new Date(y, m - 1, d);
    const age = calculateAge(birthDate);

    if (age >= 18) {
      sessionStorage.setItem("age_verified", "true");
      sessionStorage.setItem(
        "age_birthdate",
        `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`
      );
      // Just call onVerified — let React re-render naturally
      onVerified();
    } else {
      setError("You must be 18 or older to access this website.");
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-luxury-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-luxury-ivory max-w-md w-full p-8 md:p-12 text-center animate-fade-in">
        {/* Brand */}
        <div className="mb-6">
          <h1 className="font-display text-2xl md:text-3xl tracking-wider text-luxury-charcoal">
            MAISON<span className="text-luxury-gold"> FOURRURE</span>
          </h1>
          <div className="luxury-divider mx-auto" />
        </div>

        <h2 className="font-display text-xl text-luxury-charcoal mb-2">
          Age Verification
        </h2>
        <p className="font-body text-sm text-luxury-gray mb-6 leading-relaxed">
          You must be <strong>18 years or older</strong> to enter this website.
          Please enter your date of birth to continue.
        </p>

        {/* Date Inputs */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1">
            <label className="block text-xs text-luxury-gray tracking-wider uppercase mb-1">
              Day
            </label>
            <input
              type="number"
              min={1}
              max={31}
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="input-field text-center"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-luxury-gray tracking-wider uppercase mb-1">
              Month
            </label>
            <input
              type="number"
              min={1}
              max={12}
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="input-field text-center"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-luxury-gray tracking-wider uppercase mb-1">
              Year
            </label>
            <input
              type="number"
              min={1900}
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="input-field text-center"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 font-body text-sm mb-4">{error}</p>
        )}

        <button onClick={handleVerify} className="btn-primary w-full">
          Verify &amp; Enter
        </button>

        <p className="mt-6 text-xs text-luxury-gray/60">
          By entering, you confirm you are 18+ and agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}
