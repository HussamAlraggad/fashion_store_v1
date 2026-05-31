"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();
  const { items } = useCartStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleAboutClick = useCallback(() => {
    const isHome = window.location.pathname === "/";
    if (isHome) {
      const el = document.getElementById("story");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#story";
    }
  }, []);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cartCount = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-luxury-ivory/95 backdrop-blur-md border-b border-luxury-gray/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="font-display text-xl md:text-2xl tracking-wider text-luxury-charcoal">
              MAISON<span className="text-luxury-gold"> FOURRURE</span>
            </span>
          </Link>

          {/* Desktop Nav — 4 items always visible */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Collection */}
            <Link
              href="/products"
              className="px-4 py-2 font-body text-sm tracking-wide text-luxury-charcoal hover:text-luxury-gold transition-colors"
            >
              Collection
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="px-4 py-2 font-body text-sm tracking-wide text-luxury-charcoal hover:text-luxury-gold transition-colors flex items-center gap-1">
                Categories
                <svg className="w-3 h-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-luxury-ivory border border-luxury-gray/10 shadow-xl animate-fade-in">
                  <Link href="/products?category=cat-outerwear" className="block px-4 py-3 text-sm font-body text-luxury-charcoal hover:bg-luxury-cream transition-colors border-b border-luxury-gray/5">
                    Outerwear
                  </Link>
                  <Link href="/products?category=cat-stoles" className="block px-4 py-3 text-sm font-body text-luxury-charcoal hover:bg-luxury-cream transition-colors border-b border-luxury-gray/5">
                    Stoles &amp; Wraps
                  </Link>
                  <Link href="/products?category=cat-intimate" className="block px-4 py-3 text-sm font-body text-luxury-charcoal hover:bg-luxury-cream transition-colors border-b border-luxury-gray/5">
                    Intimate Apparel
                  </Link>
                  <Link href="/products?category=cat-accessories" className="block px-4 py-3 text-sm font-body text-luxury-charcoal hover:bg-luxury-cream transition-colors border-b border-luxury-gray/5">
                    Accessories
                  </Link>
                  <Link href="/products?category=cat-faux" className="block px-4 py-3 text-sm font-body text-luxury-charcoal hover:bg-luxury-cream transition-colors border-b border-luxury-gray/5">
                    Faux Fur
                  </Link>
                  <Link href="/products?category=cat-home" className="block px-4 py-3 text-sm font-body text-luxury-charcoal hover:bg-luxury-cream transition-colors">
                    Home Decor
                  </Link>
                </div>
              )}
            </div>

            {/* About */}
            <button
              onClick={handleAboutClick}
              className="px-4 py-2 font-body text-sm tracking-wide text-luxury-charcoal hover:text-luxury-gold transition-colors"
            >
              About
            </button>

            {/* Cart — always visible */}
            <Link
              href="/cart"
              className="px-4 py-2 font-body text-sm tracking-wide text-luxury-charcoal hover:text-luxury-gold transition-colors relative flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Bag
              {cartCount > 0 && (
                <span className="bg-luxury-gold text-luxury-charcoal text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin (only for admins) */}
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="px-4 py-2 font-body text-xs tracking-wider text-luxury-gold hover:text-luxury-charcoal transition-colors uppercase"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Auth / Account */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="font-body text-sm text-luxury-gray">{user?.name}</span>
                <button onClick={logout} className="btn-ghost text-xs !px-3 !py-1.5">
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="btn-primary text-xs !py-2 !px-5">
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-6 border-t border-luxury-gray/10 pt-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link href="/products" className="py-2 font-body text-sm tracking-wide" onClick={() => setMobileOpen(false)}>
                Collection
              </Link>
              <Link href="/products?category=cat-outerwear" className="py-2 pl-4 font-body text-sm text-luxury-gray" onClick={() => setMobileOpen(false)}>
                — Outerwear
              </Link>
              <Link href="/products?category=cat-stoles" className="py-2 pl-4 font-body text-sm text-luxury-gray" onClick={() => setMobileOpen(false)}>
                — Stoles &amp; Wraps
              </Link>
              <Link href="/products?category=cat-intimate" className="py-2 pl-4 font-body text-sm text-luxury-gray" onClick={() => setMobileOpen(false)}>
                — Intimate Apparel
              </Link>
              <Link href="/products?category=cat-accessories" className="py-2 pl-4 font-body text-sm text-luxury-gray" onClick={() => setMobileOpen(false)}>
                — Accessories
              </Link>
              <button
                onClick={() => { handleAboutClick(); setMobileOpen(false); }}
                className="py-2 font-body text-sm tracking-wide text-left"
              >
                About
              </button>
              <Link href="/cart" className="py-2 font-body text-sm tracking-wide" onClick={() => setMobileOpen(false)}>
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
              {isAdmin && (
                <Link href="/admin/dashboard" className="py-2 font-body text-sm tracking-wide text-luxury-gold" onClick={() => setMobileOpen(false)}>
                  Admin
                </Link>
              )}
              {isAuthenticated ? (
                <button onClick={() => { logout(); setMobileOpen(false); }} className="py-2 font-body text-sm text-left text-luxury-gray">
                  Sign Out ({user?.name})
                </button>
              ) : (
                <Link href="/auth/login" className="btn-primary text-xs py-2 px-5 w-fit mt-2" onClick={() => setMobileOpen(false)}>
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
