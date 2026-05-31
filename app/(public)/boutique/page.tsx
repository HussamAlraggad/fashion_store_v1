"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function BoutiquePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-luxury-ivory">
        {/* Hero */}
        <section className="relative h-[50vh] bg-luxury-black overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=1600&q=85"
            alt="Maison Fourrure boutique"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/80 to-transparent" />
          <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <div className="max-w-lg">
              <p className="font-body text-xs md:text-sm tracking-[0.35em] uppercase text-luxury-gold font-semibold mb-4">
                Visit Our Atelier
              </p>
              <h1 className="font-display text-4xl md:text-6xl text-luxury-ivory mb-4 font-bold">
                Milan Flagship
              </h1>
              <p className="font-body text-sm md:text-base text-luxury-ivory/80 leading-relaxed">
                Experience the world of Maison Fourrure at our flagship boutique
                in the heart of Milan&rsquo;s fashion district.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Boutique Info */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-luxury-charcoal mb-6">
                Our Flagship Boutique
              </h2>
              <div className="luxury-divider" />

              <div className="space-y-6 mt-8">
                <div>
                  <h3 className="font-display text-sm uppercase tracking-wider text-luxury-gold mb-2">
                    Address
                  </h3>
                  <p className="font-body text-sm text-luxury-charcoal leading-relaxed">
                    Via Monte Napoleone, 12
                    <br />
                    20121 Milano MI
                    <br />
                    Italy
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-sm uppercase tracking-wider text-luxury-gold mb-2">
                    Hours
                  </h3>
                  <div className="font-body text-sm text-luxury-charcoal space-y-1">
                    <p>Monday – Saturday: 10:00 – 19:00</p>
                    <p>Sunday: 12:00 – 18:00</p>
                    <p className="text-luxury-gray text-xs mt-2">
                      Private appointments available upon request
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-sm uppercase tracking-wider text-luxury-gold mb-2">
                    Contact
                  </h3>
                  <p className="font-body text-sm text-luxury-charcoal leading-relaxed">
                    +39 02 1234 5678
                    <br />
                    boutique@maisonfourrure.com
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-sm uppercase tracking-wider text-luxury-gold mb-2">
                    Services
                  </h3>
                  <ul className="font-body text-sm text-luxury-charcoal space-y-1 list-disc list-inside">
                    <li>Personal styling consultations</li>
                    <li>Custom measurements & tailoring</li>
                    <li>Fur storage & maintenance</li>
                    <li>International shipping</li>
                    <li>Complimentary champagne</li>
                  </ul>
                </div>
              </div>

              <Link href="/products" className="btn-primary inline-block mt-8">
                Shop Collection
              </Link>
            </div>

            {/* Map */}
            <div className="bg-luxury-cream border border-luxury-gray/10 p-6 h-[400px] md:h-auto flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-display text-sm text-luxury-charcoal mb-2">
                  Via Monte Napoleone, 12
                </p>
                <p className="font-body text-xs text-luxury-gray mb-4">
                  Milan, Italy 20121
                </p>
                <a
                  href="https://maps.google.com/?q=Via+Monte+Napoleone+12+Milan+Italy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-xs !px-6 !py-2"
                >
                  Open in Google Maps
                </a>
                <p className="font-body text-xs text-luxury-gray mt-4">
                  Located in Milan&rsquo;s iconic Quadrilatero della Moda
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
