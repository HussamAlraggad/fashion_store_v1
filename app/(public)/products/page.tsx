"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import type { Product, Category } from "@/lib/api";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(categoryFilter || "");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    async function load() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);
        const prods = await prodRes.json();
        const cats = await catRes.json();
        setProducts(prods);
        setCategories(cats);
      } catch (err) {
        console.error("Failed to load", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filter & sort
  let filtered = [...products];

  if (activeCategory) {
    filtered = filtered.filter((p) => p.categoryId === activeCategory);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q)
    );
  }

  switch (sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-luxury-cream py-12 md:py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="section-subtitle">The Collection</p>
            <h1 className="section-title mt-2">
              {activeCategory
                ? categories.find((c) => c.id === activeCategory)?.name ||
                  "Collection"
                : "All Pieces"}
            </h1>
            <div className="luxury-divider mx-auto" />
            <p className="font-body text-sm text-luxury-gray max-w-md mx-auto mt-4">
              Discover our curated selection of premium fur fashion,
              handpicked for the discerning connoisseur.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 pb-8 border-b border-luxury-gray/10">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 flex-1">
              <button
                onClick={() => setActiveCategory("")}
                className={`text-xs uppercase tracking-wider px-4 py-2 border transition-colors ${
                  !activeCategory
                    ? "border-luxury-charcoal bg-luxury-charcoal text-luxury-ivory"
                    : "border-luxury-gray/30 text-luxury-gray hover:border-luxury-charcoal"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-xs uppercase tracking-wider px-4 py-2 border transition-colors ${
                    activeCategory === cat.id
                      ? "border-luxury-charcoal bg-luxury-charcoal text-luxury-ivory"
                      : "border-luxury-gray/30 text-luxury-gray hover:border-luxury-charcoal"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort & Search */}
            <div className="flex gap-3 items-center">
              <input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field w-40 md:w-48 text-xs"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-auto text-xs"
              >
                <option value="default">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="font-display text-xl text-luxury-charcoal mb-2">
                No Results Found
              </h2>
              <p className="font-body text-sm text-luxury-gray">
                Try adjusting your filters or search term.
              </p>
            </div>
          ) : (
            <>
              <p className="font-body text-xs text-luxury-gray mb-6">
                Showing {filtered.length} of {products.length} pieces
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
