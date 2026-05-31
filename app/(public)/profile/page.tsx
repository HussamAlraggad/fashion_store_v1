"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Order } from "@/lib/api";

const statusStyles: Record<string, string> = {
  delivered: "bg-green-100 text-green-800",
  shipped: "bg-blue-100 text-blue-800",
  processing: "bg-yellow-100 text-yellow-800",
  pending: "bg-luxury-gray-light text-luxury-gray-dark",
  cancelled: "bg-red-100 text-red-800",
};

export default function ProfilePage() {
  const { user, isAuthenticated, isAdmin } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const res = await fetch(`/api/orders?userId=${user!.id}`);
        if (res.ok) {
          const data = await res.json();
          setOrders(Array.isArray(data) ? data : []);
        }
      } catch {
        console.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-ivory px-4">
        <div className="text-center">
          <h1 className="font-display text-2xl text-luxury-charcoal mb-4">
            Sign In Required
          </h1>
          <p className="font-body text-sm text-luxury-gray mb-6">
            Please sign in to view your profile.
          </p>
          <Link href="/auth/login" className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-luxury-ivory">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="font-display text-3xl md:text-4xl text-luxury-charcoal mb-2">
              My Account
            </h1>
            <p className="font-body text-sm text-luxury-gray">
              Welcome back, {user.name}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-luxury-cream border border-luxury-gray/10 p-6">
                <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <span className="font-display text-xl text-luxury-gold">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <h2 className="font-display text-lg text-luxury-charcoal text-center md:text-left">
                  {user.name}
                </h2>
                <p className="font-body text-xs text-luxury-gray mt-1 text-center md:text-left">
                  {user.email}
                </p>
                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className="block mt-4 btn-primary text-xs text-center"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>

              {/* Saved Addresses */}
              <div className="bg-luxury-cream border border-luxury-gray/10 p-6 mt-6">
                <h3 className="font-display text-sm text-luxury-charcoal uppercase tracking-wider mb-4">
                  Saved Addresses
                </h3>
                {orders.length > 0 ? (
                  <div className="space-y-3">
                    {Array.from(
                      new Map(
                        orders.map((o) => [
                          `${o.shippingAddress.street}-${o.shippingAddress.city}`,
                          o.shippingAddress,
                        ])
                      ).values()
                    ).map((addr, i) => (
                      <div
                        key={i}
                        className="text-xs font-body text-luxury-gray-dark bg-luxury-ivory p-3"
                      >
                        <p className="font-medium">
                          {addr.firstName} {addr.lastName}
                        </p>
                        <p>{addr.street}</p>
                        <p>
                          {addr.city}, {addr.state} {addr.zip}
                        </p>
                        <p>{addr.country}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-body text-xs text-luxury-gray">
                    No addresses saved yet.
                  </p>
                )}
              </div>
            </div>

            {/* Order History */}
            <div className="md:col-span-2">
              <h2 className="font-display text-xl text-luxury-charcoal mb-6">
                Order History
              </h2>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-luxury-cream border border-luxury-gray/10 p-12 text-center">
                  <p className="font-body text-sm text-luxury-gray mb-4">
                    No orders yet
                  </p>
                  <Link href="/products" className="btn-primary text-sm">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-luxury-cream border border-luxury-gray/10 p-6"
                    >
                      {/* Order Header */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-luxury-gray/10">
                        <div>
                          <p className="font-display text-sm text-luxury-charcoal">
                            Order #{order.id}
                          </p>
                          <p className="font-body text-xs text-luxury-gray mt-0.5">
                            Placed on {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 ${
                            statusStyles[order.status] ||
                            "bg-luxury-gray-light text-luxury-gray-dark"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-luxury-gray-light flex-shrink-0" />
                              <div>
                                <p className="font-body text-sm text-luxury-charcoal">
                                  {item.name}
                                </p>
                                <p className="font-body text-xs text-luxury-gray">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <p className="font-body text-sm text-luxury-charcoal">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-luxury-gray/10">
                        <div className="font-body text-xs text-luxury-gray">
                          {order.paymentMethod}
                        </div>
                        <div className="text-right">
                          <p className="font-body text-xs text-luxury-gray">
                            Total
                          </p>
                          <p className="font-display text-base text-luxury-charcoal">
                            {formatPrice(order.total)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
