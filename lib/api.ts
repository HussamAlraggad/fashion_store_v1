/**
 * Mock API utility — simulates network latency and wraps JSON data access.
 *
 * This module provides async functions that mimic REST API calls.
 * In production, these would be replaced with fetch() to real endpoints.
 */

import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// Simulated network delay (300-600ms)
function delay(ms?: number): Promise<void> {
  const duration = ms ?? Math.floor(Math.random() * 300) + 300;
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// ─── Generic Fetch ──────────────────────────────────────────────

export async function fetchData<T>(filename: string): Promise<T> {
  const filePath = path.join(DATA_DIR, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  await delay();
  return JSON.parse(raw) as T;
}

// ─── Product Helpers ────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  category: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  currency: string;
  images: string[];
  material: string;
  origin: string;
  color: string;
  sizes: string[];
  inStock: boolean;
  stockCount: number;
  featured: boolean;
  rating: number;
  reviewCount: number;
  citesCompliant: boolean;
  sku: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "customer";
  birthdate: string;
  ageVerified: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  createdAt: string;
  deliveredAt: string | null;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

// ─── Typed Fetch ────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  return fetchData<Product[]>("products.json");
}

export async function getProductById(
  id: string
): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getCategories(): Promise<Category[]> {
  return fetchData<Category[]>("categories.json");
}

export async function getCategoryById(
  id: string
): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((c) => c.id === id);
}

export async function getUsers(): Promise<User[]> {
  return fetchData<User[]>("users.json");
}

export async function getUserByEmail(
  email: string
): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u) => u.email === email);
}

export async function getOrders(): Promise<Order[]> {
  return fetchData<Order[]>("orders.json");
}

export async function getOrdersByUserId(
  userId: string
): Promise<Order[]> {
  const orders = await getOrders();
  return orders.filter((o) => o.userId === userId);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.featured);
}

export async function getProductsByCategory(
  categoryId: string
): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.categoryId === categoryId);
}
