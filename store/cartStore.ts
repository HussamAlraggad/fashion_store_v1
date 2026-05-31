"use client";

import { create } from "zustand";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

// Store WITHOUT persist — avoids SSR localStorage crashes.
// Cart stays in memory for the session (fine for prototype).
export const useCartStore = create<CartState>()((set, get) => ({
  items: [],

  addItem: (item, quantity = 1) => {
    set((state) => {
      const existing = state.items.find(
        (i) => i.productId === item.productId && i.size === item.size
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId && i.size === item.size
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity }] };
    });
  },

  removeItem: (productId, size) => {
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.productId === productId && i.size === size)
      ),
    }));
  },

  updateQuantity: (productId, size, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, size);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId && i.size === size
          ? { ...i, quantity }
          : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  getItemCount: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  },
}));
