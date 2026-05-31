"use client";

import { create } from "zustand";

export interface WishlistItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  material: string;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()((set, get) => ({
  items: [],

  addItem: (item) => {
    set((state) => {
      if (state.items.find((i) => i.id === item.id)) return state;
      return { items: [...state.items, item] };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
  },

  isWishlisted: (id) => {
    return get().items.some((i) => i.id === id);
  },
}));
