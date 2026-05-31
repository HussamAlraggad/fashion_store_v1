"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AgeGateModal from "@/components/ui/AgeGateModal";
import ProductCard from "@/components/product/ProductCard";
import type { Product, Category } from "@/lib/api";

export default function HomePage() {
  const [ageVerified, setAgeVerified] = useState<boolean | null>(null);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Check age verification immediately on client
    try {
      const verified = sessionStorage.getItem("age_verified") === "true";
      setAgeVerified(verified);
    } catch {
      setAgeVerified(false);
    }

    // Fetch data
    async function loadData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/products?featured=true"),
          fetch("/api/categories"),
        ]);
        if (prodRes.ok) {
          const products = await prodRes.json();
          setFeatured(Array.isArray(products) ? products : []);
        }
        if (catRes.ok) {
          const cats = await catRes.json();
          setCategories(Array.isArray(cats) ? cats : []);
        }
      } catch (err) {
        console.error("Data fetch error:", err);
      }
    }
    loadData();
  }, []);

  // Still loading (SSR or very first render)
  if (ageVerified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-ivory">
        <div className="text-center">
          <h1 className="font-display text-xl tracking-wider text-luxury-charcoal">
            MAISON<span className="text-luxury-gold"> FOURRURE</span>
          </h1>
        </div>
      </div>
    );
  }

  // Age gate
  if (!ageVerified) {
    return (
      <div className="min-h-screen bg-luxury-black">
        <AgeGateModal onVerified={() => setAgeVerified(true)} />
      </div>
    );
  }

  // Full content
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative h-[85vh] md:h-[90vh] bg-luxury-charcoal overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1600&q=85"
            alt="Luxury fur fashion editorial"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/30 to-transparent" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <p className="font-body text-xs md:text-sm tracking-[0.35em] uppercase text-luxury-gold font-semibold mb-4">
              The Art of Fur Since 1985
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-luxury-ivory mb-6 leading-tight font-bold">
              Timeless
              <br />
              <span className="text-luxury-gold">Elegance</span>
            </h1>
            <p className="font-body text-sm md:text-base text-luxury-gray max-w-md mb-10 leading-relaxed">
              Discover our latest collection of handcrafted fur fashion,
              where heritage meets contemporary design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="btn-gold text-sm md:text-base font-semibold !px-10 !py-4">
                Explore Collection
              </Link>
              <Link
                href="/#story"
                className="btn-secondary !border-luxury-ivory !text-luxury-ivory hover:!bg-luxury-ivory hover:!text-luxury-charcoal text-sm md:text-base font-semibold !px-10 !py-4 !border-2"
              >
                Our Story
              </Link>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-20 md:py-28 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="section-subtitle font-semibold tracking-[0.25em]">Curated Collections</p>
              <h2 className="section-title mt-3 font-bold">Browse by Category</h2>
              <div className="luxury-divider mx-auto" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  className="group relative overflow-hidden aspect-[3/4] bg-luxury-gray-light card-hover"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-sm md:text-base text-luxury-ivory font-semibold">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-luxury-gray mt-0.5">
                      {cat.productCount} pieces
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="py-20 md:py-28 px-4 bg-luxury-cream">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="section-subtitle font-semibold tracking-[0.25em]">Editor&apos;s Selection</p>
              <h2 className="section-title mt-3 font-bold">Featured Pieces</h2>
              <div className="luxury-divider mx-auto" />
            </div>
            {featured.length === 0 ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {featured.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            <div className="text-center mt-12">
              <Link href="/products" className="btn-secondary text-sm md:text-base font-semibold !px-10 !py-4 !border-2">
                View All Collection →
              </Link>
            </div>
          </div>
        </section>

        {/* BRAND STORY */}
        <section id="story" className="py-20 md:py-28 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <p className="section-subtitle font-semibold tracking-[0.25em]">Heritage &amp; Craftsmanship</p>
              <h2 className="section-title mt-3 mb-6 font-bold">
                Four Decades of
                <br />
                <span className="text-luxury-gold">Mastery</span>
              </h2>
              <div className="luxury-divider" />
              <p className="font-body text-sm md:text-base text-luxury-gray-dark leading-relaxed mb-6">
                Nestled in the heart of Milan&rsquo;s fashion district, our atelier has
                been perfecting the art of fur craftsmanship for four generations.
              </p>
              <p className="font-body text-sm md:text-base text-luxury-gray leading-relaxed mb-8">
                From the sprawling fur markets of Scandinavia to the auction houses
                of North America, we travel the globe to bring you the world&rsquo;s
                most exquisite fur fashion.
              </p>
              <Link href="/products" className="btn-primary text-sm md:text-base font-semibold !px-10 !py-4">
                Shop the Collection
              </Link>
            </div>
            <div className="relative aspect-[4/5] bg-luxury-gray-light overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=85"
                alt="Luxury fashion craftsmanship"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 px-4 bg-luxury-charcoal">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl text-luxury-ivory mb-4 font-bold leading-tight">
              Ready to Experience
              <br />
              <span className="text-luxury-gold">True Luxury</span>?
            </h2>
            <p className="font-body text-sm md:text-base text-luxury-gray mb-10 max-w-lg mx-auto leading-relaxed">
              Browse our complete collection or visit our flagship boutique
              in Milan for a personal consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn-gold text-sm md:text-base font-semibold !px-10 !py-4">
                Shop Collection
              </Link>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !border-luxury-ivory !text-luxury-ivory hover:!bg-luxury-ivory hover:!text-luxury-charcoal text-sm md:text-base font-semibold !px-10 !py-4 !border-2"
              >
                Visit Our Boutique
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
