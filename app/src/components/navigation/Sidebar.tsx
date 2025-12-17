"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  BarChart3,
  Target,
  Rocket,
  Calculator,
  Info,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Shield,
  LogIn,
  TrendingUp,
  Upload,
  GitMerge,
  LineChart,
  BookOpen,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const partnerLogos = [
  { name: "UNIDO", src: "/logos/unido.png" },
  { name: "Net Zero Partnership", src: "/logos/net-zero-partnership.png" },
  { name: "GCCA", src: "/logos/gcca.png" },
  { name: "AFCP", src: "/logos/afcp.png" },
];

const navItems = [
  { href: "/", label: "Home", icon: Home, requiresAuth: false },
  { href: "/2030", label: "Trayectoria 2030", icon: Target, requiresAuth: false },
  { href: "/2050", label: "Trayectoria 2050", icon: Rocket, requiresAuth: false },
];

// Submenú de Benchmarking
const benchmarkingSubMenu = [
  {
    href: "/benchmarking",
    label: "Comparativa Global",
    icon: BarChart3,
  },
  {
    href: "/calculadora",
    label: "Calculadora",
    icon: Calculator,
    requiresAuth: true,
  },
];

// Submenú de Seguimiento basado en roles (Flujo Simplificado)
const seguimientoSubMenu = [
  {
    href: "/seguimiento/submit-data",
    label: "Enviar Datos",
    icon: Upload,
    roles: ["INFORMANTE_EMPRESA"]
  },
  {
    href: "/seguimiento/process",
    label: "Procesar Reportes",
    icon: GitMerge,
    roles: ["ADMIN_PROCESO"]
  },
  {
    href: "/seguimiento/results",
    label: "Resultados",
    icon: LineChart,
    roles: ["INFORMANTE_EMPRESA", "ADMIN_PROCESO"]
  },
  {
    href: "/seguimiento/metodologia",
    label: "Metodología",
    icon: BookOpen,
    roles: ["INFORMANTE_EMPRESA", "ADMIN_PROCESO"]
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [benchmarkingOpen, setBenchmarkingOpen] = useState(false);
  const [seguimientoOpen, setSeguimientoOpen] = useState(false);

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
      {/* Logo y Branding */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-22 rounded-md bg-white overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/ficem.png"
              alt="FICEM"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white leading-tight">Net Zero 2050</span>
            <span className="text-xs text-white/70 font-medium">Argentina</span>
          </div>
        </Link>
      </div>

      {/* Navegación principal */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
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

          {/* Benchmarking con submenú expandible */}
          <li>
            <button
              onClick={() => setBenchmarkingOpen(!benchmarkingOpen)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                pathname.startsWith("/benchmarking") || pathname === "/calculadora"
                  ? "bg-[#5B9BD5] text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span className="flex-1 text-left">Benchmarking</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  benchmarkingOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Submenú */}
            {benchmarkingOpen && (
              <ul className="mt-1 ml-2 space-y-1">
                {benchmarkingSubMenu.map((subItem) => {
                  const isSubActive = pathname === subItem.href;
                  const SubIcon = subItem.icon;
                  const isDisabled = subItem.requiresAuth && !isAuthenticated;

                  if (isDisabled) {
                    return (
                      <li key={subItem.href}>
                        <div
                          className="flex items-center gap-3 rounded-lg pl-11 pr-4 py-2.5 text-sm font-medium text-white/30 cursor-not-allowed"
                          title="Requiere iniciar sesión"
                        >
                          <SubIcon className="h-4 w-4" />
                          {subItem.label}
                        </div>
                      </li>
                    );
                  }

                  return (
                    <li key={subItem.href}>
                      <Link
                        href={subItem.href}
                        className={`flex items-center gap-3 rounded-lg pl-11 pr-4 py-2.5 text-sm font-medium transition-colors ${
                          isSubActive
                            ? "bg-[#5B9BD5] text-white"
                            : "text-white/60 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <SubIcon className="h-4 w-4" />
                        {subItem.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>

          {/* Seguimiento con submenú expandible */}
          {isAuthenticated && (
            <li>
              <Link
                href="/seguimiento"
                onClick={() => setSeguimientoOpen(!seguimientoOpen)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  pathname.startsWith("/seguimiento")
                    ? "bg-[#5B9BD5] text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <TrendingUp className="h-5 w-5" />
                <span className="flex-1 text-left">Seguimiento</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSeguimientoOpen(!seguimientoOpen);
                  }}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      seguimientoOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </Link>

              {/* Submenú */}
              {seguimientoOpen && (
                <ul className="mt-1 ml-2 space-y-1">
                  {seguimientoSubMenu.map((subItem) => {
                    // Verificar si el usuario tiene permiso para ver esta opción
                    const hasPermission = user && subItem.roles.includes(user.role);
                    if (!hasPermission) return null;

                    const isSubActive = pathname === subItem.href;
                    const SubIcon = subItem.icon;

                    return (
                      <li key={subItem.href}>
                        <Link
                          href={subItem.href}
                          className={`flex items-center gap-3 rounded-lg pl-11 pr-4 py-2.5 text-sm font-medium transition-colors ${
                            isSubActive
                              ? "bg-[#5B9BD5] text-white"
                              : "text-white/60 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <SubIcon className="h-4 w-4" />
                          {subItem.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          )}
        </ul>

        {/* Admin link */}
        {user?.role === "ADMIN_PROCESO" && (
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

        {/* Sobre - Al final */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <Link
            href="/sobre"
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              pathname === "/sobre"
                ? "bg-[#5B9BD5] text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Info className="h-5 w-5" />
            Sobre
          </Link>
        </div>
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
                <p className="text-xs text-white/50 capitalize">{user.role === "ADMIN_PROCESO" ? "Administrador" : "Miembro"}</p>
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
