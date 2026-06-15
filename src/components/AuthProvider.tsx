"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AUTH_KEY = "career-e-sandbox-user";

export const DEFAULT_USER_NAME = "John Doe";
export const DEFAULT_USER_EMAIL = "name@email.com";

interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (user?: Partial<AuthUser>) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(readStoredUser());
  }, []);

  const signIn = useCallback((partial?: Partial<AuthUser>) => {
    const nextUser: AuthUser = {
      name: partial?.name?.trim() || DEFAULT_USER_NAME,
      email: partial?.email?.trim() || DEFAULT_USER_EMAIL,
    };
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
