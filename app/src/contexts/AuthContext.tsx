"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "public" | "member" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isMember: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved session on mount
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // Simulated login for development
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Demo users for testing
      const demoUsers: Record<string, User> = {
        "admin@afcp.org.ar": {
          id: "1",
          email: "admin@afcp.org.ar",
          name: "Administrador AFCP",
          role: "admin",
          organization: "AFCP",
        },
        "miembro@empresa.com": {
          id: "2",
          email: "miembro@empresa.com",
          name: "Usuario Miembro",
          role: "member",
          organization: "Holcim Argentina",
        },
      };

      const demoUser = demoUsers[email];
      if (demoUser && password === "demo123") {
        setUser(demoUser);
        localStorage.setItem("user", JSON.stringify(demoUser));
        return true;
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    isMember: user?.role === "member" || user?.role === "admin",
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
