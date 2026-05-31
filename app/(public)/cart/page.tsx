"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal } =
    useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const shipping = subtotal >= 5000 ? 0 : 35;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 px-4 py-20">
          <h2 className="font-display text-2xl text-luxury-charcoal">
            Your Cart is Empty
          </h2>
          <p className="font-body text-sm text-luxury-gray">
            Browse our collection and add pieces you love.
          </p>
          <Link href="/products" className="btn-primary">
            Explore Collection
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="font-display text-3xl md:text-4xl text-luxury-charcoal mb-2">
            Shopping Bag
          </h1>
          <p className="font-body text-sm text-luxury-gray mb-8">
            {items.reduce((acc, i) => acc + i.quantity, 0)} items
          </p>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4 pb-6 border-b border-luxury-gray/10"
                >
                  {/* Image */}
                  <div className="w-24 h-32 md:w-28 md:h-36 bg-luxury-gray-light flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-display text-sm md:text-base text-luxury-charcoal">
                          <Link
                            href={`/products/${item.productId}`}
                            className="hover:text-luxury-gold transition-colors"
                          >
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-xs text-luxury-gray mt-1">
                          Size: {item.size}
                        </p>
                      </div>
                      <p className="font-body text-sm text-luxury-charcoal font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center border border-luxury-gray/30">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="px-3 py-1 text-sm hover:bg-luxury-gray-light transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 text-sm border-x border-luxury-gray/30">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="px-3 py-1 text-sm hover:bg-luxury-gray-light transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        className="text-xs text-luxury-gray hover:text-red-500 transition-colors uppercase tracking-wider"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-xs text-luxury-gray hover:text-red-500 transition-colors uppercase tracking-wider"
              >
                Clear Bag
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-luxury-cream p-6 md:p-8 sticky top-24">
                <h2 className="font-display text-lg text-luxury-charcoal mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 font-body text-sm">
                  <div className="flex justify-between">
                    <span className="text-luxury-gray">Subtotal</span>
                    <span className="text-luxury-charcoal">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-luxury-gray">Shipping</span>
                    <span className="text-luxury-charcoal">
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[10px] text-luxury-gray">
                      Free shipping on orders over {formatPrice(5000)}
                    </p>
                  )}
                  <div className="flex justify-between">
                    <span className="text-luxury-gray">Tax (8%)</span>
                    <span className="text-luxury-charcoal">
                      {formatPrice(tax)}
                    </span>
                  </div>
                  <div className="border-t border-luxury-gray/20 pt-3 mt-3">
                    <div className="flex justify-between font-medium">
                      <span className="text-luxury-charcoal">Total</span>
                      <span className="font-display text-lg text-luxury-charcoal">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout" className="btn-primary w-full mt-6">
                  Proceed to Checkout
                </Link>

                <Link
                  href="/products"
                  className="btn-ghost w-full text-center mt-2 block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
