"use client";

import { create } from "zustand";

export interface AuthUser {
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
  initialize: () => void;
}

function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem("auth_user");
    if (raw) return JSON.parse(raw) as AuthUser;
  } catch {}
  return null;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: (user: AuthUser) => {
    sessionStorage.setItem("auth_user", JSON.stringify(user));
    set({
      user,
      isAuthenticated: true,
      isAdmin: user.role === "admin",
    });
  },
  logout: () => {
    sessionStorage.removeItem("auth_user");
    sessionStorage.removeItem("age_verified");
    fetch("/api/auth", { method: "DELETE" }).catch(() => {});
    set({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
    });
  },
  initialize: () => {
    const user = getStoredUser();
    if (user) {
      set({
        user,
        isAuthenticated: true,
        isAdmin: user.role === "admin",
      });
    }
  },
}));
