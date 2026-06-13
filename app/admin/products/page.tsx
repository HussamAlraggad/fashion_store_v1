"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import type { Product } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const userStr = sessionStorage.getItem("auth_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === "admin") setAuthenticated(true);
    }
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const res = await fetch("/api/products");
      setProducts(await res.json());
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  }

  const toggleStock = useCallback(async (product: Product) => {
    setUpdating(product.id);
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inStock: !product.inStock }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, inStock: !p.inStock } : p
          )
        );
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update");
      }
    } catch {
      alert("Network error updating product");
    } finally {
      setUpdating(null);
    }
  }, []);

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
              Products
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
            All Products ({products.length})
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
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">
                      Image
                    </th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">
                      Name
                    </th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">
                      Category
                    </th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">
                      Price
                    </th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">
                      Stock
                    </th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">
                      Status
                    </th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-luxury-gray font-medium">
                      Toggle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-luxury-gray/5 hover:bg-luxury-gray-light/30 transition-colors"
                    >
                      <td className="py-3">
                        <div className="w-12 h-14 bg-luxury-gray-light overflow-hidden">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3 text-luxury-charcoal font-medium">
                        {p.name}
                      </td>
                      <td className="py-3 text-luxury-gray">{p.category}</td>
                      <td className="py-3">{formatPrice(p.price)}</td>
                      <td className="py-3">{p.stockCount}</td>
                      <td className="py-3">
                        <span
                          className={`text-xs px-2 py-1 ${
                            p.inStock
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {p.inStock ? "Active" : "Sold Out"}
                        </span>
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => toggleStock(p)}
                          disabled={updating === p.id}
                          className={`text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-colors disabled:opacity-50 ${
                            p.inStock
                              ? "border-red-300 text-red-600 hover:bg-red-50"
                              : "border-green-300 text-green-600 hover:bg-green-50"
                          }`}
                        >
                          {updating === p.id
                            ? "…"
                            : p.inStock
                            ? "Mark Sold Out"
                            : "Mark In Stock"}
                        </button>
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
