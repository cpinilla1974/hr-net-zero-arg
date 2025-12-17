"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole =
  | "public"
  | "ROOT"
  | "ADMIN_PROCESO"
  | "EJECUTIVO_FICEM"
  | "AMIGO_FICEM"
  | "COORDINADOR_PAIS"
  | "SUPERVISOR_EMPRESA"
  | "INFORMANTE_EMPRESA"
  | "VISOR_EMPRESA";

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  organization?: string;
  empresa_id?: number;
  pais?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isInformante: boolean;
  isSupervisor: boolean;
  isVisor: boolean;
  isCoordinador: boolean;
  isAdminFicem: boolean;
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
      const { authAPI } = await import("@/lib/api/auth");

      // Login via API
      await authAPI.login({ email, password });

      // Get user data
      const userData = await authAPI.getCurrentUser();

      // Map API response to User interface
      const user: User = {
        id: userData.id,
        email: userData.email,
        name: userData.nombre,
        role: userData.rol,
        empresa_id: userData.empresa_id,
        pais: userData.pais,
      };

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    const { authAPI } = await import("@/lib/api/auth");
    authAPI.logout();
    setUser(null);
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    isInformante: user?.role === "INFORMANTE_EMPRESA",
    isSupervisor: user?.role === "SUPERVISOR_EMPRESA",
    isVisor: user?.role === "VISOR_EMPRESA",
    isCoordinador: user?.role === "COORDINADOR_PAIS",
    isAdminFicem: user?.role === "ADMIN_PROCESO",
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
