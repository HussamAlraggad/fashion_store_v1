"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();
  const { items } = useCartStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-luxury-ivory/95 backdrop-blur-md border-b border-luxury-gray/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-xl md:text-2xl tracking-wider text-luxury-charcoal">
              MAISON<span className="text-luxury-gold"> FOURRURE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className="font-body text-sm tracking-wide text-luxury-charcoal hover:text-luxury-gold transition-colors"
            >
              Collection
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/cart"
                  className="font-body text-sm tracking-wide text-luxury-charcoal hover:text-luxury-gold transition-colors relative"
                >
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-4 bg-luxury-gold text-luxury-charcoal text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className="font-body text-sm tracking-wide text-luxury-gold hover:text-luxury-charcoal transition-colors"
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Auth / Account */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="font-body text-sm text-luxury-gray">
                  {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="btn-ghost text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="btn-primary text-xs py-2 px-6">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-luxury-charcoal"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-6 border-t border-luxury-gray/10 pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                href="/products"
                className="font-body text-sm tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                Collection
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/cart"
                    className="font-body text-sm tracking-wide"
                    onClick={() => setMobileOpen(false)}
                  >
                    Cart {cartCount > 0 && `(${cartCount})`}
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin/dashboard"
                      className="font-body text-sm text-luxury-gold"
                      onClick={() => setMobileOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <button onClick={logout} className="btn-ghost text-sm w-fit">
                    Sign Out ({user?.name})
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="btn-primary text-xs py-2 px-6 w-fit"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
