"use client";

import { User, Mail, Building2, Shield, Key } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function PerfilContent() {
  const { user } = useAuth();

  if (!user) return null;

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      ROOT: "Root",
      ADMIN_PROCESO: "Administrador de Proceso",
      EJECUTIVO_FICEM: "Ejecutivo FICEM",
      AMIGO_FICEM: "Amigo FICEM",
      COORDINADOR_PAIS: "Coordinador de País",
      SUPERVISOR_EMPRESA: "Supervisor de Empresa",
      INFORMANTE_EMPRESA: "Informante de Empresa",
      VISOR_EMPRESA: "Visor de Empresa",
      public: "Público",
    };
    return labels[role] || role;
  };

  return (
    <main className="flex-1 bg-[var(--background-secondary)] min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-8 lg:px-8">
        <h1 className="text-3xl font-bold text-[var(--primary)] tracking-tight">
          Mi Perfil
        </h1>
        <p className="mt-1 text-[var(--foreground-muted)]">
          Información de tu cuenta y configuración personal.
        </p>
      </div>

      <div className="px-6 py-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Avatar y nombre */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <div className="flex items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#5B9BD5] text-white text-2xl font-bold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--primary)]">{user.name}</h2>
                <p className="text-[var(--foreground-muted)] flex items-center gap-2 mt-1">
                  <Shield className="h-4 w-4" />
                  {getRoleLabel(user.role)}
                </p>
              </div>
            </div>
          </div>

          {/* Información de la cuenta */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">
              Información de la Cuenta
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 py-3 border-b border-[var(--border)]">
                <Mail className="h-5 w-5 text-[var(--foreground-muted)]" />
                <div>
                  <p className="text-sm text-[var(--foreground-muted)]">Correo electrónico</p>
                  <p className="font-medium text-[var(--primary)]">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-3 border-b border-[var(--border)]">
                <User className="h-5 w-5 text-[var(--foreground-muted)]" />
                <div>
                  <p className="text-sm text-[var(--foreground-muted)]">Nombre completo</p>
                  <p className="font-medium text-[var(--primary)]">{user.name}</p>
                </div>
              </div>
              {user.organization && (
                <div className="flex items-center gap-4 py-3">
                  <Building2 className="h-5 w-5 text-[var(--foreground-muted)]" />
                  <div>
                    <p className="text-sm text-[var(--foreground-muted)]">Organización</p>
                    <p className="font-medium text-[var(--primary)]">{user.organization}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Seguridad */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">
              Seguridad
            </h3>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <Key className="h-5 w-5 text-[var(--foreground-muted)]" />
                <div>
                  <p className="font-medium text-[var(--primary)]">Contraseña</p>
                  <p className="text-sm text-[var(--foreground-muted)]">Última actualización: hace 30 días</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-[#5B9BD5] border border-[#5B9BD5] rounded-lg hover:bg-[#5B9BD5]/10 transition-colors">
                Cambiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PerfilPage() {
  return (
    <ProtectedRoute requireAuth={true}>
      <PerfilContent />
    </ProtectedRoute>
  );
}
