"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

type Step = "shipping" | "review" | "payment" | "confirmation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>("shipping");
  const [processing, setProcessing] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = getSubtotal();
  const shippingCost = subtotal >= 5000 ? 0 : 35;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  function validateShipping(): boolean {
    const errs: Record<string, string> = {};
    if (!shipping.firstName.trim()) errs.firstName = "Required";
    if (!shipping.lastName.trim()) errs.lastName = "Required";
    if (!shipping.street.trim()) errs.street = "Required";
    if (!shipping.city.trim()) errs.city = "Required";
    if (!shipping.state.trim()) errs.state = "Required";
    if (!shipping.zip.trim()) errs.zip = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleShippingSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validateShipping()) setStep("review");
  }

  function handlePlaceOrder() {
    setProcessing(true);
    // Mock payment processing delay
    setTimeout(() => {
      clearCart();
      setStep("confirmation");
      setProcessing(false);
    }, 2000);
  }

  if (items.length === 0 && step !== "confirmation") {
    return (
      <>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 px-4 py-20">
          <h2 className="font-display text-2xl text-luxury-charcoal">
            Your Cart is Empty
          </h2>
          <p className="font-body text-sm text-luxury-gray">
            Add some pieces before checking out.
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="font-display text-3xl md:text-4xl text-luxury-charcoal mb-2">
            Checkout
          </h1>

          {/* Steps Indicator */}
          <div className="flex items-center gap-2 mb-8 mt-6">
            {(["shipping", "review", "payment", "confirmation"] as const).map(
              (s, idx) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-medium ${
                      step === s
                        ? "bg-luxury-charcoal text-luxury-ivory"
                        : ["review", "payment", "confirmation"].includes(step) &&
                          ["shipping"].indexOf(s) <
                            ["shipping", "review", "payment", "confirmation"]
                              .indexOf(step)
                        ? "bg-luxury-gold text-luxury-charcoal"
                        : "bg-luxury-gray-light text-luxury-gray"
                    }`}
                  >
                    {step === "confirmation" && s === "confirmation"
                      ? "✓"
                      : idx + 1}
                  </div>
                  <span className="text-xs text-luxury-gray hidden sm:block capitalize">
                    {s}
                  </span>
                  {idx < 3 && <div className="w-8 h-px bg-luxury-gray/30" />}
                </div>
              )
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Shipping */}
              {step === "shipping" && (
                <form onSubmit={handleShippingSubmit}>
                  <h2 className="font-display text-xl text-luxury-charcoal mb-6">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxury-gray mb-1 font-body">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={shipping.firstName}
                        onChange={(e) =>
                          setShipping({ ...shipping, firstName: e.target.value })
                        }
                        className={`input-field ${errors.firstName ? "border-red-500" : ""}`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxury-gray mb-1 font-body">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={shipping.lastName}
                        onChange={(e) =>
                          setShipping({ ...shipping, lastName: e.target.value })
                        }
                        className={`input-field ${errors.lastName ? "border-red-500" : ""}`}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs uppercase tracking-wider text-luxury-gray mb-1 font-body">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={shipping.street}
                        onChange={(e) =>
                          setShipping({ ...shipping, street: e.target.value })
                        }
                        className={`input-field ${errors.street ? "border-red-500" : ""}`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxury-gray mb-1 font-body">
                        City
                      </label>
                      <input
                        type="text"
                        value={shipping.city}
                        onChange={(e) =>
                          setShipping({ ...shipping, city: e.target.value })
                        }
                        className={`input-field ${errors.city ? "border-red-500" : ""}`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxury-gray mb-1 font-body">
                        State
                      </label>
                      <input
                        type="text"
                        value={shipping.state}
                        onChange={(e) =>
                          setShipping({ ...shipping, state: e.target.value })
                        }
                        className={`input-field ${errors.state ? "border-red-500" : ""}`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxury-gray mb-1 font-body">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={shipping.zip}
                        onChange={(e) =>
                          setShipping({ ...shipping, zip: e.target.value })
                        }
                        className={`input-field ${errors.zip ? "border-red-500" : ""}`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxury-gray mb-1 font-body">
                        Country
                      </label>
                      <select
                        value={shipping.country}
                        onChange={(e) =>
                          setShipping({ ...shipping, country: e.target.value })
                        }
                        className="input-field"
                      >
                        <option value="US">United States</option>
                        <option value="IT">Italy</option>
                        <option value="FR">France</option>
                        <option value="UK">United Kingdom</option>
                        <option value="DE">Germany</option>
                        <option value="AE">UAE</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn-primary mt-6">
                    Continue to Review
                  </button>
                </form>
              )}

              {/* Step 2: Review */}
              {step === "review" && (
                <div>
                  <h2 className="font-display text-xl text-luxury-charcoal mb-6">
                    Review Your Order
                  </h2>

                  <div className="space-y-4 mb-8">
                    {items.map((item) => (
                      <div
                        key={`${item.productId}-${item.size}`}
                        className="flex gap-4 pb-4 border-b border-luxury-gray/10"
                      >
                        <div className="w-16 h-20 bg-luxury-gray-light overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-body text-sm text-luxury-charcoal">
                            {item.name}
                          </h3>
                          <p className="text-xs text-luxury-gray">
                            Size: {item.size} × Qty: {item.quantity}
                          </p>
                          <p className="font-body text-sm text-luxury-charcoal mt-1">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-8">
                    <h3 className="font-display text-sm uppercase tracking-wider text-luxury-charcoal mb-2">
                      Shipping To
                    </h3>
                    <p className="font-body text-sm text-luxury-gray">
                      {shipping.firstName} {shipping.lastName}
                    </p>
                    <p className="font-body text-sm text-luxury-gray">
                      {shipping.street}
                    </p>
                    <p className="font-body text-sm text-luxury-gray">
                      {shipping.city}, {shipping.state} {shipping.zip}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("shipping")}
                      className="btn-secondary"
                    >
                      Edit Shipping
                    </button>
                    <button
                      onClick={() => setStep("payment")}
                      className="btn-primary"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === "payment" && (
                <div>
                  <h2 className="font-display text-xl text-luxury-charcoal mb-6">
                    Payment
                  </h2>

                  <div className="p-6 bg-luxury-cream mb-6">
                    <p className="font-body text-sm text-luxury-gray mb-4">
                      This is a <strong>mock payment</strong> — no real
                      transaction will be processed.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-luxury-gray mb-1 font-body">
                          Card Number
                        </label>
                        <input
                          type="text"
                          defaultValue="4242 4242 4242 4242"
                          className="input-field text-luxury-gray-dark"
                          readOnly
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-luxury-gray mb-1 font-body">
                            Expiry
                          </label>
                          <input
                            type="text"
                            defaultValue="12/28"
                            className="input-field text-luxury-gray-dark"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-luxury-gray mb-1 font-body">
                            CVV
                          </label>
                          <input
                            type="text"
                            defaultValue="123"
                            className="input-field text-luxury-gray-dark"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("review")}
                      className="btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={processing}
                      className="btn-primary flex-1"
                    >
                      {processing
                        ? "Processing…"
                        : `Pay ${formatPrice(total)}`}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === "confirmation" && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="font-display text-2xl text-luxury-charcoal mb-2">
                    Order Confirmed
                  </h2>
                  <p className="font-body text-sm text-luxury-gray mb-2">
                    Thank you for your purchase.
                  </p>
                  <p className="font-body text-xs text-luxury-gray mb-8">
                    A confirmation email will be sent to your registered email.
                  </p>
                  <Link href="/products" className="btn-primary">
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-luxury-cream p-6 md:p-8 sticky top-24">
                <h2 className="font-display text-lg text-luxury-charcoal mb-6">
                  Summary
                </h2>
                <div className="space-y-3 font-body text-sm">
                  <div className="flex justify-between">
                    <span className="text-luxury-gray">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-luxury-gray">Shipping</span>
                    <span>
                      {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-luxury-gray">Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-luxury-gray/20 pt-3 mt-3">
                    <div className="flex justify-between font-medium">
                      <span className="text-luxury-charcoal">Total</span>
                      <span className="font-display text-lg">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
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
