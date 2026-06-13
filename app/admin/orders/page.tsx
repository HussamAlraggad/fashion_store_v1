"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import type { Order } from "@/lib/api";
import { formatPrice, formatDate } from "@/lib/utils";

type OrderStatus = Order["status"];

const STATUS_FLOW: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const userStr = sessionStorage.getItem("auth_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === "admin") setAuthenticated(true);
    }
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const res = await fetch("/api/orders");
      setOrders(await res.json());
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  }

  const updateStatus = useCallback(
    async (orderId: string, newStatus: OrderStatus) => {
      setUpdating(orderId);
      try {
        const res = await fetch(`/api/orders/${orderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });

        if (res.ok) {
          // Update local state immediately
          setOrders((prev) =>
            prev.map((o) =>
              o.id === orderId
                ? {
                    ...o,
                    status: newStatus,
                    deliveredAt:
                      newStatus === "delivered"
                        ? new Date().toISOString()
                        : o.deliveredAt,
                  }
                : o
            )
          );
        } else {
          const data = await res.json();
          alert(data.error || "Failed to update");
        }
      } catch (err) {
        alert("Network error updating order");
      } finally {
        setUpdating(null);
      }
    },
    []
  );

  const cancelOrder = useCallback(
    async (orderId: string) => {
      if (!confirm("Are you sure you want to cancel this order?")) return;
      await updateStatus(orderId, "cancelled");
    },
    [updateStatus]
  );

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-ivory">
        <div className="text-center">
          <h1 className="font-display text-2xl mb-4">Admin Access Required</h1>
          <Link href="/auth/login" className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-ivory">
      <header className="bg-luxury-charcoal text-luxury-ivory px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="font-display text-lg tracking-wider"
            >
              MF<span className="text-luxury-gold"> ADMIN</span>
            </Link>
            <span className="text-xs text-luxury-gold/60 uppercase tracking-wider">
              Orders
            </span>
          </div>
          <Link
            href="/admin/dashboard"
            className="text-xs text-luxury-ivory/60 hover:text-luxury-ivory transition-colors"
          >
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
          ) : orders.length === 0 ? (
            <p className="text-center py-12 font-body text-sm text-luxury-gray">
              No orders yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-sm">
                <thead>
                  <tr className="border-b border-luxury-gray/10">
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">
                      Order
                    </th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">
                      Date
                    </th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">
                      Customer
                    </th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">
                      Items
                    </th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">
                      Total
                    </th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">
                      Status
                    </th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => {
                    const currentIdx = STATUS_FLOW.indexOf(o.status as OrderStatus);
                    const nextStatus =
                      currentIdx >= 0 && currentIdx < STATUS_FLOW.length - 1
                        ? STATUS_FLOW[currentIdx + 1]
                        : null;
                    const isCancelled = o.status === "cancelled";
                    const isDelivered = o.status === "delivered";

                    return (
                      <tr
                        key={o.id}
                        className={`border-b border-luxury-gray/5 hover:bg-luxury-gray-light/30 transition-colors ${
                          isCancelled ? "opacity-60" : ""
                        }`}
                      >
                        <td className="py-3 font-medium text-luxury-charcoal font-mono text-xs">
                          {o.id.toUpperCase()}
                        </td>
                        <td className="py-3 text-luxury-gray text-xs">
                          {formatDate(o.createdAt)}
                        </td>
                        <td className="py-3">
                          <p className="text-luxury-charcoal">
                            {o.shippingAddress.firstName}{" "}
                            {o.shippingAddress.lastName}
                          </p>
                          <p className="text-xs text-luxury-gray">
                            {o.shippingAddress.country}
                          </p>
                        </td>
                        <td className="py-3 text-xs">
                          {o.items.map((i) => (
                            <div key={i.productId}>
                              {i.name} × {i.quantity}
                            </div>
                          ))}
                        </td>
                        <td className="py-3 font-medium">
                          {formatPrice(o.total)}
                        </td>
                        <td className="py-3">
                          <span
                            className={`text-xs capitalize px-2 py-1 ${
                              STATUS_COLORS[o.status as OrderStatus] ||
                              "bg-gray-100"
                            }`}
                          >
                            {o.status}
                          </span>
                          {isDelivered && o.deliveredAt && (
                            <p className="text-[10px] text-luxury-gray mt-1">
                              {formatDate(o.deliveredAt)}
                            </p>
                          )}
                        </td>
                        <td className="py-3">
                          <div className="flex gap-1">
                            {nextStatus && (
                              <button
                                onClick={() => updateStatus(o.id, nextStatus)}
                                disabled={updating === o.id}
                                className="text-[10px] uppercase tracking-wider px-2 py-1 bg-luxury-charcoal text-luxury-ivory hover:bg-luxury-black transition-colors disabled:opacity-50"
                              >
                                {updating === o.id
                                  ? "…"
                                  : `→ ${nextStatus}`}
                              </button>
                            )}
                            {!isCancelled && !isDelivered && (
                              <button
                                onClick={() => cancelOrder(o.id)}
                                disabled={updating === o.id}
                                className="text-[10px] uppercase tracking-wider px-2 py-1 border border-red-300 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
