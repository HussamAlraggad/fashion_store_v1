"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Order } from "@/lib/api";
import { formatPrice, formatDate } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const userStr = sessionStorage.getItem("auth_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === "admin") setAuthenticated(true);
    }

    async function load() {
      try {
        const res = await fetch("/api/orders");
        setOrders(await res.json());
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-ivory">
        <div className="text-center">
          <h1 className="font-display text-2xl mb-4">Admin Access Required</h1>
          <Link href="/auth/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-luxury-ivory">
      <header className="bg-luxury-charcoal text-luxury-ivory px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="font-display text-lg tracking-wider">
              MF<span className="text-luxury-gold"> ADMIN</span>
            </Link>
            <span className="text-xs text-luxury-gold/60 uppercase tracking-wider">Orders</span>
          </div>
          <Link href="/admin/dashboard" className="text-xs text-luxury-gray hover:text-luxury-ivory transition-colors">
            ← Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-luxury-gray/10 p-6">
          <h2 className="font-display text-lg text-luxury-charcoal mb-6">
            All Orders ({orders.length})
          </h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-sm">
                <thead>
                  <tr className="border-b border-luxury-gray/10">
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Order ID</th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Date</th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Customer</th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Items</th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Total</th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Payment</th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-luxury-gray/5 hover:bg-luxury-gray-light/30 transition-colors">
                      <td className="py-3 font-medium text-luxury-charcoal font-mono text-xs">{o.id.toUpperCase()}</td>
                      <td className="py-3 text-luxury-gray text-xs">{formatDate(o.createdAt)}</td>
                      <td className="py-3">
                        <p className="text-luxury-charcoal">{o.shippingAddress.firstName} {o.shippingAddress.lastName}</p>
                        <p className="text-xs text-luxury-gray">{o.shippingAddress.country}</p>
                      </td>
                      <td className="py-3 text-xs">
                        {o.items.map((i) => (
                          <div key={i.productId}>{i.name} × {i.quantity}</div>
                        ))}
                      </td>
                      <td className="py-3 font-medium">{formatPrice(o.total)}</td>
                      <td className="py-3 text-xs text-luxury-gray font-mono">{o.paymentMethod}</td>
                      <td className="py-3">
                        <span className={`text-xs capitalize px-2 py-1 ${statusColors[o.status] || "bg-gray-100"}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
