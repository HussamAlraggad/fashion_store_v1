"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-luxury-ivory">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-display text-3xl md:text-4xl text-luxury-charcoal">
                Wishlist
              </h1>
              <p className="font-body text-sm text-luxury-gray mt-1">
                {items.length} {items.length === 1 ? "item" : "items"} saved
              </p>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="bg-luxury-cream border border-luxury-gray/10 p-12 text-center">
              <p className="font-body text-sm text-luxury-gray mb-4">
                Your wishlist is empty
              </p>
              <Link href="/products" className="btn-primary text-sm">
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-luxury-cream border border-luxury-gray/10 group"
                >
                  <Link href={`/products/${item.slug}`} className="block">
                    <div className="aspect-[3/4] bg-luxury-gray-light overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-gray font-body mb-1">
                      {item.material}
                    </p>
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-display text-sm text-luxury-charcoal hover:text-luxury-gold transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="font-body text-sm text-luxury-charcoal mt-2 font-medium">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => {
                          addItem({
                            productId: item.id,
                            slug: item.slug,
                            name: item.name,
                            price: item.price,
                            size: "M",
                            image: item.image,
                          });
                        }}
                        className="btn-primary text-xs flex-1 !py-2"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="btn-ghost text-xs !py-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
