"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Route, LineChart, Calculator, Info } from "lucide-react";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/hoja-de-ruta", label: "Hoja de Ruta", icon: Route },
  { href: "/dashboard", label: "Dashboard", icon: LineChart },
  { href: "/calculadora", label: "Calculadora", icon: Calculator },
  { href: "/sobre", label: "Sobre", icon: Info },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 border-t border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm md:hidden">
      <div className="flex h-20 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                isActive
                  ? "text-[var(--primary)]"
                  : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-xs ${isActive ? "font-bold" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
