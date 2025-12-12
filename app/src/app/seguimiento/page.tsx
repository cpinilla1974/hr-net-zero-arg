"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function SeguimientoPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Redirect based on user role
    if (user) {
      switch (user.role) {
        case "INFORMANTE_EMPRESA":
        case "VISOR_EMPRESA":
          router.push("/seguimiento/submit-data");
          break;
        case "SUPERVISOR_EMPRESA":
          router.push("/seguimiento/review-approve");
          break;
        case "COORDINADOR_PAIS":
          router.push("/seguimiento/monitoring");
          break;
        case "ADMIN_PROCESO":
          router.push("/seguimiento/aggregation");
          break;
        default:
          router.push("/seguimiento/trajectories");
      }
    }
  }, [user, isAuthenticated, isLoading, router]);

  // Loading state
  return (
    <main className="flex-1 flex items-center justify-center p-8 bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#5B9BD5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </main>
  );
}