import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-luxury-charcoal text-luxury-ivory mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-xl tracking-wider mb-4">
              MAISON<span className="text-luxury-gold"> FOURRURE</span>
            </h3>
            <p className="font-body text-sm text-luxury-ivory/70 max-w-md leading-relaxed">
              Since 1985, Maison Fourrure has been crafting the world&apos;s finest fur
              fashion. Our atelier combines centuries-old craftsmanship with
              contemporary design, bringing luxury to discerning clients
              worldwide.
            </p>
            <div className="mt-4 flex gap-4">
              <span className="text-xs text-luxury-ivory/60 tracking-wider uppercase">
                Est. 1985
              </span>
              <span className="text-luxury-gold">|</span>
              <span className="text-xs text-luxury-ivory/60 tracking-wider uppercase">
                Milano · Paris · New York
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest mb-4 text-luxury-gold">
              Browse
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="font-body text-sm text-luxury-ivory/70 hover:text-luxury-gold transition-colors"
                >
                  All Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=cat-outerwear"
                  className="font-body text-sm text-luxury-ivory/70 hover:text-luxury-gold transition-colors"
                >
                  Outerwear
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=cat-stoles"
                  className="font-body text-sm text-luxury-ivory/70 hover:text-luxury-gold transition-colors"
                >
                  Stoles &amp; Wraps
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=cat-accessories"
                  className="font-body text-sm text-luxury-ivory/70 hover:text-luxury-gold transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest mb-4 text-luxury-gold">
              Information
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="font-body text-sm text-luxury-ivory/70">
                  Via della Spiga 25, Milano
                </span>
              </li>
              <li>
                <span className="font-body text-sm text-luxury-ivory/70">
                  +39 02 1234 5678
                </span>
              </li>
              <li>
                <span className="font-body text-sm text-luxury-ivory/70">
                  concierge@maisonfourrure.com
                </span>
              </li>
              <li className="pt-2">
                <span className="text-xs text-luxury-ivory/50">
                  18+ Only · Age verification required
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-luxury-ivory/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-luxury-ivory/50">
            &copy; {new Date().getFullYear()} Maison Fourrure. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-xs text-luxury-ivory/50">
            <span className="hover:text-luxury-gold transition-colors cursor-default">Privacy Policy</span>
            <span className="hover:text-luxury-gold transition-colors cursor-default">Terms of Service</span>
            <span className="hover:text-luxury-gold transition-colors cursor-default">CITES Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
