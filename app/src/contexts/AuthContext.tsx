"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole =
  | "public"
  | "INFORMANTE_EMPRESA"
  | "SUPERVISOR_EMPRESA"
  | "VISOR_EMPRESA"
  | "COORDINADOR_PAIS"
  | "ADMIN_PROCESO";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization?: string;
  empresa_id?: string; // ID de la empresa para filtrar datos
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
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
      // TODO: Replace with actual API call
      // Simulated login for development
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Demo users for testing
      const demoUsers: Record<string, User> = {
        // Holcim
        "informante@holcim.com": {
          id: "1",
          email: "informante@holcim.com",
          name: "Informante Holcim",
          role: "INFORMANTE_EMPRESA",
          organization: "Holcim Argentina",
          empresa_id: "holcim",
        },
        "supervisor@holcim.com": {
          id: "2",
          email: "supervisor@holcim.com",
          name: "Supervisor Holcim",
          role: "SUPERVISOR_EMPRESA",
          organization: "Holcim Argentina",
          empresa_id: "holcim",
        },
        "visor@holcim.com": {
          id: "3",
          email: "visor@holcim.com",
          name: "Visor Holcim",
          role: "VISOR_EMPRESA",
          organization: "Holcim Argentina",
          empresa_id: "holcim",
        },
        // Loma Negra
        "informante@lomanegra.com": {
          id: "4",
          email: "informante@lomanegra.com",
          name: "Informante Loma Negra",
          role: "INFORMANTE_EMPRESA",
          organization: "Loma Negra",
          empresa_id: "loma-negra",
        },
        "supervisor@lomanegra.com": {
          id: "5",
          email: "supervisor@lomanegra.com",
          name: "Supervisor Loma Negra",
          role: "SUPERVISOR_EMPRESA",
          organization: "Loma Negra",
          empresa_id: "loma-negra",
        },
        // Avellaneda
        "informante@avellaneda.com": {
          id: "6",
          email: "informante@avellaneda.com",
          name: "Informante Avellaneda",
          role: "INFORMANTE_EMPRESA",
          organization: "Avellaneda",
          empresa_id: "avellaneda",
        },
        "supervisor@avellaneda.com": {
          id: "7",
          email: "supervisor@avellaneda.com",
          name: "Supervisor Avellaneda",
          role: "SUPERVISOR_EMPRESA",
          organization: "Avellaneda",
          empresa_id: "avellaneda",
        },
        // PCR
        "informante@pcr.com": {
          id: "8",
          email: "informante@pcr.com",
          name: "Informante PCR",
          role: "INFORMANTE_EMPRESA",
          organization: "Petroquímica Comodoro Rivadavia",
          empresa_id: "pcr",
        },
        "supervisor@pcr.com": {
          id: "9",
          email: "supervisor@pcr.com",
          name: "Supervisor PCR",
          role: "SUPERVISOR_EMPRESA",
          organization: "Petroquímica Comodoro Rivadavia",
          empresa_id: "pcr",
        },
        // Coordinador AFCP
        "coordinador@afcp.org.ar": {
          id: "10",
          email: "coordinador@afcp.org.ar",
          name: "Coordinador AFCP",
          role: "COORDINADOR_PAIS",
          organization: "AFCP",
        },
        // Admin FICEM
        "admin@ficem.org": {
          id: "11",
          email: "admin@ficem.org",
          name: "Admin FICEM",
          role: "ADMIN_PROCESO",
          organization: "FICEM",
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
