"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requireAuth?: boolean;
}

export function ProtectedRoute({
  children,
  requiredRole,
  requireAuth = true,
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push("/login");
        return;
      }

      if (requiredRole) {
        const roleHierarchy: Record<UserRole, number> = {
          public: 0,
          member: 1,
          admin: 2,
        };

        const userRoleLevel = user ? roleHierarchy[user.role] : 0;
        const requiredRoleLevel = roleHierarchy[requiredRole];

        if (userRoleLevel < requiredRoleLevel) {
          router.push("/");
        }
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, requireAuth, router]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#5B9BD5]" />
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (requiredRole && user) {
    const roleHierarchy: Record<UserRole, number> = {
      public: 0,
      member: 1,
      admin: 2,
    };

    const userRoleLevel = roleHierarchy[user.role];
    const requiredRoleLevel = roleHierarchy[requiredRole];

    if (userRoleLevel < requiredRoleLevel) {
      return null;
    }
  }

  return <>{children}</>;
}
