"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Order, Product } from "@/lib/api";
import { formatPrice, formatDate } from "@/lib/utils";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const userStr = sessionStorage.getItem("auth_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === "admin") {
        setAuthenticated(true);
      }
    }

    async function load() {
      try {
        const [ordRes, prodRes] = await Promise.all([
          fetch("/api/orders"),
          fetch("/api/products"),
        ]);
        setOrders(await ordRes.json());
        setProducts(await prodRes.json());
      } catch (err) {
        console.error("Failed to load admin data", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-ivory px-4">
        <div className="text-center">
          <h1 className="font-display text-2xl text-luxury-charcoal mb-4">
            Admin Access Required
          </h1>
          <p className="font-body text-sm text-luxury-gray mb-6">
            You need admin credentials to view this page.
          </p>
          <Link href="/auth/login" className="btn-primary">
            Sign In as Admin
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.status !== "cancelled" ? o.total : 0),
    0
  );
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const lowStock = products.filter((p) => p.stockCount <= 5 && p.inStock).length;

  return (
    <div className="min-h-screen bg-luxury-ivory">
      <header className="bg-luxury-charcoal text-luxury-ivory px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-display text-lg tracking-wider">
              MF<span className="text-luxury-gold"> ADMIN</span>
            </Link>
            <span className="text-xs text-luxury-gold/60 uppercase tracking-wider">
              Dashboard
            </span>
          </div>
          <Link
            href="/"
            className="text-xs text-luxury-ivory/60 hover:text-luxury-ivory transition-colors"
          >
            Back to Store
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 border border-luxury-gray/10">
            <p className="text-xs uppercase tracking-wider text-luxury-gray font-body">
              Total Orders
            </p>
            <p className="font-display text-2xl text-luxury-charcoal mt-1">
              {orders.length}
            </p>
          </div>
          <div className="bg-white p-6 border border-luxury-gray/10">
            <p className="text-xs uppercase tracking-wider text-luxury-gray font-body">
              Total Revenue
            </p>
            <p className="font-display text-2xl text-luxury-charcoal mt-1">
              {formatPrice(totalRevenue)}
            </p>
          </div>
          <div className="bg-white p-6 border border-luxury-gray/10">
            <p className="text-xs uppercase tracking-wider text-luxury-gray font-body">
              Pending Orders
            </p>
            <p className="font-display text-2xl text-luxury-charcoal mt-1">
              {pendingOrders}
            </p>
          </div>
          <div className="bg-white p-6 border border-luxury-gray/10">
            <p className="text-xs uppercase tracking-wider text-luxury-gray font-body">
              Low Stock Items
            </p>
            <p className="font-display text-2xl text-luxury-charcoal mt-1">
              {lowStock}
            </p>
          </div>
        </div>

        {/* Products Overview */}
        <div className="bg-white border border-luxury-gray/10 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg text-luxury-charcoal">
              Products ({products.length})
            </h2>
            <Link
              href="/admin/products"
              className="text-xs text-luxury-gold hover:text-luxury-charcoal transition-colors uppercase tracking-wider"
            >
              Manage Products
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body text-sm">
              <thead>
                <tr className="border-b border-luxury-gray/10">
                  <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Name</th>
                  <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Price</th>
                  <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Stock</th>
                  <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 8).map((p) => (
                  <tr key={p.id} className="border-b border-luxury-gray/5">
                    <td className="py-3 text-luxury-charcoal">{p.name}</td>
                    <td className="py-3">{formatPrice(p.price)}</td>
                    <td className="py-3">{p.stockCount}</td>
                    <td className="py-3">
                      <span
                        className={`text-xs px-2 py-1 ${
                          p.inStock
                            ? p.stockCount <= 5
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {p.inStock
                          ? p.stockCount <= 5
                            ? "Low Stock"
                            : "In Stock"
                          : "Sold Out"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-luxury-gray/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg text-luxury-charcoal">
              Recent Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs text-luxury-gold hover:text-luxury-charcoal transition-colors uppercase tracking-wider"
            >
              All Orders
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body text-sm">
              <thead>
                <tr className="border-b border-luxury-gray/10">
                  <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Order</th>
                  <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Date</th>
                  <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Items</th>
                  <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Total</th>
                  <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-luxury-gray/5">
                    <td className="py-3 font-medium text-luxury-charcoal">{o.id.toUpperCase()}</td>
                    <td className="py-3 text-luxury-gray">{formatDate(o.createdAt)}</td>
                    <td className="py-3">{o.items.length}</td>
                    <td className="py-3">{formatPrice(o.total)}</td>
                    <td className="py-3">
                      <span
                        className={`text-xs capitalize px-2 py-1 ${
                          o.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : o.status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : o.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
