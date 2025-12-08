"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  Map,
  Calculator,
  Info,
  Settings,
  LogOut,
  Leaf,
  User,
  ChevronDown,
  Shield,
  LogIn,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const partnerLogos = [
  { name: "UNIDO", src: "/logos/unido.png" },
  { name: "Net Zero Partnership", src: "/logos/net-zero-partnership.png" },
  { name: "GCCA", src: "/logos/gcca.png" },
  { name: "FICEM", src: "/logos/ficem.png" },
  { name: "AFCP", src: "/logos/afcp.png" },
];

const navItems = [
  { href: "/", label: "Home", icon: Home, requiresAuth: false },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, requiresAuth: false },
  { href: "/hoja-de-ruta", label: "Hoja de Ruta", icon: Map, requiresAuth: false },
  { href: "/calculadora", label: "Calculadora", icon: Calculator, requiresAuth: true },
  { href: "/sobre", label: "Sobre", icon: Info, requiresAuth: false },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="sidebar hidden lg:flex flex-col bg-[#1B3A5F]">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5B9BD5]">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">Net Zero 2050</span>
        </Link>
      </div>

      {/* Navegación principal */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            const isDisabled = item.requiresAuth && !isAuthenticated;

            if (isDisabled) {
              return (
                <li key={item.href}>
                  <div
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/30 cursor-not-allowed"
                    title="Requiere iniciar sesión"
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </div>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#5B9BD5] text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Admin link */}
        {isAdmin && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <Link
              href="/admin"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                pathname === "/admin"
                  ? "bg-[#5B9BD5] text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Shield className="h-5 w-5" />
              Administración
            </Link>
          </div>
        )}
      </nav>

      {/* Logos de socios */}
      <div className="border-t border-white/10 px-4 py-4">
        <p className="text-[10px] text-white/50 uppercase tracking-wider mb-3">Con el apoyo de</p>
        <div className="grid grid-cols-2 gap-2">
          {partnerLogos.map((logo) => (
            <div
              key={logo.name}
              className="bg-white rounded p-2 flex items-center justify-center"
              title={logo.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                className="h-6 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer del sidebar - User area */}
      <div className="border-t border-white/10 p-3">
        {isAuthenticated && user ? (
          <div className="relative">
            {/* User button */}
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5B9BD5] text-white text-xs font-semibold">
                {getInitials(user.name)}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-white/50 capitalize">{user.role === "admin" ? "Administrador" : "Miembro"}</p>
              </div>
              <ChevronDown className={`h-4 w-4 text-white/50 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown menu */}
            {userMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-[#2E5A8B] rounded-lg shadow-lg overflow-hidden">
                <Link
                  href="/perfil"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-white/10 transition-colors"
                >
                  <User className="h-4 w-4" />
                  Mi Perfil
                </Link>
                <Link
                  href="/configuracion"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-white/10 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Configuración
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-300 hover:bg-white/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogIn className="h-5 w-5" />
            Iniciar Sesión
          </Link>
        )}
      </div>
    </aside>
  );
}
