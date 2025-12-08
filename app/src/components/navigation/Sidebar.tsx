"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calculator,
  LineChart,
  FileText,
  Settings,
  LogOut,
  Leaf,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/calculadora", label: "Calculadora", icon: Calculator },
  { href: "/hoja-de-ruta", label: "Escenarios", icon: LineChart },
  { href: "/sobre", label: "Reportes", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar hidden lg:flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight">Hoja de Ruta</span>
            <span className="text-sm text-[var(--foreground-muted)]">Net Zero</span>
          </div>
        </Link>
      </div>

      {/* Navegación principal */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--foreground-muted)] hover:bg-[var(--background-card)] hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer del sidebar */}
      <div className="border-t border-[var(--border)] p-4">
        <ul className="space-y-2">
          <li>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[var(--foreground-muted)] transition-colors hover:bg-[var(--background-card)] hover:text-white">
              <Settings className="h-5 w-5" />
              Ajustes
            </button>
          </li>
          <li>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[var(--foreground-muted)] transition-colors hover:bg-[var(--background-card)] hover:text-white">
              <LogOut className="h-5 w-5" />
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
