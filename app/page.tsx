"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AgeGateModal from "@/components/ui/AgeGateModal";
import ProductCard from "@/components/product/ProductCard";
import type { Product, Category } from "@/lib/api";

export default function HomePage() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Check age verification
    const verified = sessionStorage.getItem("age_verified") === "true";
    setAgeVerified(verified);
    setLoading(false);

    // Fetch data
    async function loadData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/products?featured=true"),
          fetch("/api/categories"),
        ]);
        const products = await prodRes.json();
        const cats = await catRes.json();
        setFeatured(products);
        setCategories(cats);
      } catch (err) {
        console.error("Failed to load data", err);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-ivory">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-body text-sm text-luxury-gray">Loading…</p>
        </div>
      </div>
    );
  }

  if (!ageVerified) {
    return (
      <div className="min-h-screen bg-luxury-black">
        <AgeGateModal onVerified={() => setAgeVerified(true)} />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] md:h-[90vh] bg-luxury-charcoal overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1512436991641-6748432a39ad?w=1600&q=80)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/40 via-transparent to-luxury-black/80" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-luxury-gold mb-4">
              The Art of Fur Since 1985
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-luxury-ivory mb-6 leading-tight">
              Timeless
              <br />
              <span className="text-luxury-gold">Elegance</span>
            </h1>
            <p className="font-body text-sm md:text-base text-luxury-gray max-w-md mb-8">
              Discover our latest collection of handcrafted fur fashion,
              where heritage meets contemporary design.
            </p>
            <Link href="/products" className="btn-gold text-xs md:text-sm">
              Explore Collection
            </Link>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-subtitle">Curated Collections</p>
              <h2 className="section-title mt-2">Browse by Category</h2>
              <div className="luxury-divider mx-auto" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  className="group relative overflow-hidden aspect-[3/4] bg-luxury-gray-light card-hover"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${cat.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-sm md:text-base text-luxury-ivory">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-luxury-gray mt-1">
                      {cat.productCount} pieces
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24 px-4 bg-luxury-cream">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-subtitle">Editor&apos;s Pick</p>
              <h2 className="section-title mt-2">Featured Pieces</h2>
              <div className="luxury-divider mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featured.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/products" className="btn-secondary">
                View All Collection
              </Link>
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-subtitle">Heritage &amp; Craftsmanship</p>
              <h2 className="section-title mt-2 mb-6">
                Four Decades of
                <br />
                <span className="text-luxury-gold">Mastery</span>
              </h2>
              <div className="luxury-divider" />
              <p className="font-body text-sm md:text-base text-luxury-gray-dark leading-relaxed mb-6">
                Nestled in the heart of Milan&rsquo;s fashion district, our atelier has
                been perfecting the art of fur craftsmanship for four generations.
                Each piece is a testament to the meticulous skill of our master
                artisans, who select only the finest pelts from ethical sources.
              </p>
              <p className="font-body text-sm text-luxury-gray leading-relaxed">
                From the sprawling fur markets of Scandinavia to the auction houses
                of North America, we travel the globe to bring you the world&rsquo;s
                most exquisite fur fashion.
              </p>
            </div>
            <div className="relative aspect-[4/5] bg-luxury-gray-light overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80)",
                }}
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-4 bg-luxury-charcoal">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl text-luxury-ivory mb-4">
              Ready to Experience
              <br />
              <span className="text-luxury-gold">True Luxury</span>?
            </h2>
            <p className="font-body text-sm md:text-base text-luxury-gray mb-8 max-w-lg mx-auto">
              Browse our complete collection or visit our flagship boutique
              in Milan for a personal consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn-gold">
                Shop Collection
              </Link>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !border-luxury-ivory !text-luxury-ivory hover:!bg-luxury-ivory hover:!text-luxury-charcoal"
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
