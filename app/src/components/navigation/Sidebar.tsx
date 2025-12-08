"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  Map,
  Calculator,
  Info,
  Settings,
  LogOut,
  Leaf,
} from "lucide-react";

const partnerLogos = [
  { name: "UNIDO", src: "/logos/unido.png" },
  { name: "Net Zero Partnership", src: "/logos/net-zero-partnership.png" },
  { name: "GCCA", src: "/logos/gcca.png" },
  { name: "FICEM", src: "/logos/ficem.png" },
  { name: "AFCP", src: "/logos/afcp.png" },
];

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/hoja-de-ruta", label: "Hoja de Ruta", icon: Map },
  { href: "/calculadora", label: "Calculadora", icon: Calculator },
  { href: "/sobre", label: "Sobre", icon: Info },
];

export function Sidebar() {
  const pathname = usePathname();

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

      {/* Footer del sidebar */}
      <div className="border-t border-white/10 p-3">
        <ul className="space-y-1">
          <li>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white">
              <Settings className="h-5 w-5" />
              Configuración
            </button>
          </li>
          <li>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white">
              <LogOut className="h-5 w-5" />
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
