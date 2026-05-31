"use client";

import { create } from "zustand";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "customer";
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

// Store WITHOUT persist — avoids SSR localStorage crashes.
// For prototype, auth is managed via sessionStorage anyway.
export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: (user: AuthUser) =>
    set({
      user,
      isAuthenticated: true,
      isAdmin: user.role === "admin",
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
    }),
}));
