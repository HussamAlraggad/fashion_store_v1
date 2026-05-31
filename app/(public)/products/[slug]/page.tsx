"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/api";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addItem } = useCartStore();
  const { addItem: addWishlist, removeItem: removeWishlist, isWishlisted } = useWishlistStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/products?slug=${slug}`);
        const data = await res.json();
        setProduct(data.id ? data : null);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  function handleAddToCart() {
    if (!product) return;
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        size: selectedSize,
        image: product.images[0],
      },
      1
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleToggleWishlist() {
    if (!product) return;
    if (isWishlisted(product.id)) {
      removeWishlist(product.id);
    } else {
      addWishlist({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0],
        material: product.material,
      });
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
          <h2 className="font-display text-2xl text-luxury-charcoal">
            Product Not Found
          </h2>
          <p className="font-body text-sm text-luxury-gray">
            This piece may no longer be available.
          </p>
          <Link href="/products" className="btn-primary">
            Browse Collection
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-luxury-gray tracking-wider uppercase font-body">
              <li>
                <Link href="/" className="hover:text-luxury-charcoal transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href={`/products?category=${product.categoryId}`}
                  className="hover:text-luxury-charcoal transition-colors"
                >
                  {product.category}
                </Link>
              </li>
              <li>/</li>
              <li className="text-luxury-charcoal">{product.name}</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden bg-luxury-gray-light">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.compareAtPrice && (
                  <span className="absolute top-4 left-4 bg-luxury-gold text-luxury-charcoal text-xs font-bold uppercase tracking-wider px-3 py-1">
                    Sale
                  </span>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-24 overflow-hidden border-2 transition-colors ${
                        idx === selectedImage
                          ? "border-luxury-gold"
                          : "border-transparent hover:border-luxury-gray/30"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-luxury-gray font-body mb-2">
                  {product.material}
                </p>
                <h1 className="font-display text-3xl md:text-4xl text-luxury-charcoal">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-luxury-gold">
                    {"★".repeat(Math.round(product.rating))}
                  </span>
                  <span className="text-xs text-luxury-gray">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl text-luxury-charcoal">
                  {formatPrice(product.price, product.currency)}
                </span>
                {product.compareAtPrice && (
                  <span className="font-body text-sm text-luxury-gray line-through">
                    {formatPrice(product.compareAtPrice, product.currency)}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-luxury-gray/10" />

              {/* Description */}
              <p className="font-body text-sm text-luxury-gray-dark leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              {product.sizes.length > 0 && (
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-luxury-gray mb-3">
                    Size: <span className="text-luxury-charcoal font-medium">{selectedSize}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-sm border transition-all ${
                          selectedSize === size
                            ? "border-luxury-charcoal bg-luxury-charcoal text-luxury-ivory"
                            : "border-luxury-gray/30 text-luxury-charcoal hover:border-luxury-charcoal"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`btn-primary flex-1 ${
                    added ? "!bg-green-700 !text-white" : ""
                  }`}
                >
                  {added
                    ? "✓ Added to Cart"
                    : product.inStock
                    ? "Add to Cart"
                    : "Sold Out"}
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`w-12 h-12 flex items-center justify-center border transition-colors ${
                    isWishlisted(product.id)
                      ? "border-luxury-gold text-luxury-gold"
                      : "border-luxury-gray/20 text-luxury-gray hover:border-luxury-gold hover:text-luxury-gold"
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <svg className="w-5 h-5" fill={isWishlisted(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-luxury-gray/10">
                <div>
                  <p className="text-xs uppercase tracking-wider text-luxury-gray font-body">
                    Material
                  </p>
                  <p className="font-body text-sm text-luxury-charcoal">{product.material}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-luxury-gray font-body">
                    Origin
                  </p>
                  <p className="font-body text-sm text-luxury-charcoal">{product.origin}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-luxury-gray font-body">
                    Color
                  </p>
                  <p className="font-body text-sm text-luxury-charcoal">{product.color}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-luxury-gray font-body">
                    SKU
                  </p>
                  <p className="font-body text-sm text-luxury-charcoal">{product.sku}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-luxury-gray font-body">
                    CITES Compliant
                  </p>
                  <p className="font-body text-sm text-luxury-charcoal">
                    {product.citesCompliant ? "Yes" : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-luxury-gray font-body">
                    Availability
                  </p>
                  <p className={`font-body text-sm ${product.inStock ? "text-green-700" : "text-red-500"}`}>
                    {product.inStock ? `In Stock (${product.stockCount})` : "Sold Out"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
