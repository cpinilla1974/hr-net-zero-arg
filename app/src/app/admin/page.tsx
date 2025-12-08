"use client";

import { useState } from "react";
import { Users, UserPlus, Shield, Mail, Building2, Trash2, Edit2 } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { UserRole } from "@/contexts/AuthContext";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  createdAt: string;
}

// Mock users for demo
const mockUsers: MockUser[] = [
  {
    id: "1",
    name: "Administrador AFCP",
    email: "admin@afcp.org.ar",
    role: "admin",
    organization: "AFCP",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Usuario Miembro",
    email: "miembro@empresa.com",
    role: "member",
    organization: "Holcim Argentina",
    createdAt: "2024-03-20",
  },
  {
    id: "3",
    name: "María García",
    email: "maria.garcia@lomanegra.com",
    role: "member",
    organization: "Loma Negra",
    createdAt: "2024-06-10",
  },
  {
    id: "4",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@avellaneda.com",
    role: "member",
    organization: "Cementos Avellaneda",
    createdAt: "2024-08-05",
  },
];

function AdminContent() {
  const [users] = useState<MockUser[]>(mockUsers);
  const [showAddModal, setShowAddModal] = useState(false);

  const getRoleBadge = (role: UserRole) => {
    const styles = {
      admin: "bg-purple-100 text-purple-700",
      member: "bg-blue-100 text-blue-700",
      public: "bg-gray-100 text-gray-700",
    };
    const labels = {
      admin: "Administrador",
      member: "Miembro",
      public: "Público",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role]}`}>
        {labels[role]}
      </span>
    );
  };

  return (
    <main className="flex-1 bg-[var(--background-secondary)] min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-8 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--primary)] tracking-tight">
              Administración
            </h1>
            <p className="mt-1 text-[var(--foreground-muted)]">
              Gestión de usuarios y configuración del sistema.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#5B9BD5] text-white rounded-lg font-medium hover:bg-[#4A8AC4] transition-colors"
          >
            <UserPlus className="h-5 w-5" />
            Nuevo Usuario
          </button>
        </div>
      </div>

      <div className="px-6 py-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-[var(--border)] p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--primary)]">{users.length}</p>
                  <p className="text-sm text-[var(--foreground-muted)]">Usuarios totales</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[var(--border)] p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--primary)]">
                    {users.filter((u) => u.role === "admin").length}
                  </p>
                  <p className="text-sm text-[var(--foreground-muted)]">Administradores</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[var(--border)] p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--primary)]">
                    {new Set(users.map((u) => u.organization).filter(Boolean)).size}
                  </p>
                  <p className="text-sm text-[var(--foreground-muted)]">Organizaciones</p>
                </div>
              </div>
            </div>
          </div>

          {/* Users table */}
          <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--border)]">
              <h2 className="text-lg font-semibold text-[var(--primary)]">Usuarios</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--background-secondary)]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                      Organización
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                      Fecha registro
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-[var(--background-secondary)]/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5B9BD5] text-white text-sm font-semibold">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-medium text-[var(--primary)]">{user.name}</p>
                            <p className="text-sm text-[var(--foreground-muted)] flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--foreground-muted)]">
                        {user.organization || "-"}
                      </td>
                      <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                      <td className="px-6 py-4 text-sm text-[var(--foreground-muted)]">
                        {new Date(user.createdAt).toLocaleDateString("es-AR")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-2 text-[var(--foreground-muted)] hover:text-[#5B9BD5] hover:bg-[#5B9BD5]/10 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2 text-[var(--foreground-muted)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal (simplified) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">Nuevo Usuario</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--primary)] mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:border-[#5B9BD5] focus:ring-2 focus:ring-[#5B9BD5]/20 outline-none"
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--primary)] mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:border-[#5B9BD5] focus:ring-2 focus:ring-[#5B9BD5]/20 outline-none"
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--primary)] mb-1">
                  Organización
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:border-[#5B9BD5] focus:ring-2 focus:ring-[#5B9BD5]/20 outline-none"
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--primary)] mb-1">Rol</label>
                <select className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:border-[#5B9BD5] focus:ring-2 focus:ring-[#5B9BD5]/20 outline-none">
                  <option value="member">Miembro</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-[var(--border)] rounded-lg font-medium text-[var(--foreground-muted)] hover:bg-[var(--background-secondary)] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#5B9BD5] text-white rounded-lg font-medium hover:bg-[#4A8AC4] transition-colors"
                >
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminContent />
    </ProtectedRoute>
  );
}
