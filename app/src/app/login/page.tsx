"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/");
      } else {
        setError("Credenciales inválidas. Intente nuevamente.");
      }
    } catch {
      setError("Error al iniciar sesión. Intente más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA] flex flex-col items-center justify-center p-4">
      {/* Login Card */}
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1B3A5F] mb-4">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#1B3A5F]">Net Zero 2050</h1>
          <p className="text-[#6B7280] mt-1">Cemento y Hormigón Argentina</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-[#1B3A5F] mb-6 text-center">
            Iniciar Sesión
          </h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#1B3A5F] mb-1.5"
              >
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B7280]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:border-[#5B9BD5] focus:ring-2 focus:ring-[#5B9BD5]/20 outline-none transition-colors text-[#1B3A5F] placeholder:text-[#9CA3AF]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#1B3A5F] mb-1.5"
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B7280]" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:border-[#5B9BD5] focus:ring-2 focus:ring-[#5B9BD5]/20 outline-none transition-colors text-[#1B3A5F] placeholder:text-[#9CA3AF]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="/recuperar-password"
                className="text-sm text-[#5B9BD5] hover:text-[#1B3A5F] transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-lg bg-[#5B9BD5] text-white font-medium hover:bg-[#4A8AC4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          {/* Demo credentials - solo en desarrollo */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 p-3 rounded-lg bg-[#F5F8FA] border border-[#E5E7EB]">
              <p className="text-xs font-semibold text-[#1B3A5F] mb-2 flex items-center gap-1">
                🔐 Usuarios de prueba
              </p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {/* Admin FICEM */}
                <button
                  type="button"
                  onClick={() => {
                    setEmail("ficem@ficem.org");
                    setPassword("ficem123");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#E5E7EB] hover:border-[#5B9BD5] hover:bg-[#5B9BD5]/5 transition-colors text-xs"
                >
                  <span className="inline-block px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 text-[10px] font-medium mr-2">
                    Admin FICEM
                  </span>
                  ficem@ficem.org
                </button>

                {/* Coordinador AFCP */}
                <button
                  type="button"
                  onClick={() => {
                    setEmail("coordinador@afcp.org.ar");
                    setPassword("demo123");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#E5E7EB] hover:border-[#5B9BD5] hover:bg-[#5B9BD5]/5 transition-colors text-xs"
                >
                  <span className="inline-block px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-medium mr-2">
                    Coord. País
                  </span>
                  coordinador@afcp.org.ar
                </button>

                <div className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide pt-2 pb-1">
                  Holcim Argentina
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("supervisor@holcim.com.ar");
                    setPassword("demo123");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#E5E7EB] hover:border-[#5B9BD5] hover:bg-[#5B9BD5]/5 transition-colors text-xs"
                >
                  <span className="inline-block px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-medium mr-2">
                    Supervisor
                  </span>
                  supervisor@holcim.com.ar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("informante@holcim.com.ar");
                    setPassword("demo123");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#E5E7EB] hover:border-[#5B9BD5] hover:bg-[#5B9BD5]/5 transition-colors text-xs"
                >
                  <span className="inline-block px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 text-[10px] font-medium mr-2">
                    Informante
                  </span>
                  informante@holcim.com.ar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("visor@holcim.com.ar");
                    setPassword("demo123");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#E5E7EB] hover:border-[#5B9BD5] hover:bg-[#5B9BD5]/5 transition-colors text-xs"
                >
                  <span className="inline-block px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-medium mr-2">
                    Visor
                  </span>
                  visor@holcim.com.ar
                </button>

                <div className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide pt-2 pb-1">
                  Loma Negra
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("supervisor@lomanegra.com");
                    setPassword("demo123");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#E5E7EB] hover:border-[#5B9BD5] hover:bg-[#5B9BD5]/5 transition-colors text-xs"
                >
                  <span className="inline-block px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-medium mr-2">
                    Supervisor
                  </span>
                  supervisor@lomanegra.com
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("informante@lomanegra.com");
                    setPassword("demo123");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#E5E7EB] hover:border-[#5B9BD5] hover:bg-[#5B9BD5]/5 transition-colors text-xs"
                >
                  <span className="inline-block px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 text-[10px] font-medium mr-2">
                    Informante
                  </span>
                  informante@lomanegra.com
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("visor@lomanegra.com");
                    setPassword("demo123");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#E5E7EB] hover:border-[#5B9BD5] hover:bg-[#5B9BD5]/5 transition-colors text-xs"
                >
                  <span className="inline-block px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-medium mr-2">
                    Visor
                  </span>
                  visor@lomanegra.com
                </button>

                <div className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide pt-2 pb-1">
                  Avellaneda
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("supervisor@avellaneda.com");
                    setPassword("demo123");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#E5E7EB] hover:border-[#5B9BD5] hover:bg-[#5B9BD5]/5 transition-colors text-xs"
                >
                  <span className="inline-block px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-medium mr-2">
                    Supervisor
                  </span>
                  supervisor@avellaneda.com
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("informante@avellaneda.com");
                    setPassword("demo123");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#E5E7EB] hover:border-[#5B9BD5] hover:bg-[#5B9BD5]/5 transition-colors text-xs"
                >
                  <span className="inline-block px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 text-[10px] font-medium mr-2">
                    Informante
                  </span>
                  informante@avellaneda.com
                </button>

                <div className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide pt-2 pb-1">
                  PCR
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("supervisor@pcr.com.ar");
                    setPassword("demo123");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#E5E7EB] hover:border-[#5B9BD5] hover:bg-[#5B9BD5]/5 transition-colors text-xs"
                >
                  <span className="inline-block px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-medium mr-2">
                    Supervisor
                  </span>
                  supervisor@pcr.com.ar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("informante@pcr.com.ar");
                    setPassword("demo123");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#E5E7EB] hover:border-[#5B9BD5] hover:bg-[#5B9BD5]/5 transition-colors text-xs"
                >
                  <span className="inline-block px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 text-[10px] font-medium mr-2">
                    Informante
                  </span>
                  informante@pcr.com.ar
                </button>
              </div>
              <p className="text-[10px] text-[#6B7280] mt-2">
                Contraseña: <span className="font-mono font-semibold">demo123</span>
                <br />
                <span className="text-[9px]">(Admin FICEM usa: <span className="font-mono font-semibold">ficem123</span>)</span>
              </p>
            </div>
          )}
        </div>

        {/* Back to home */}
        <p className="text-center mt-6 text-sm text-[#6B7280]">
          <Link href="/" className="text-[#5B9BD5] hover:text-[#1B3A5F] transition-colors">
            ← Volver al inicio
          </Link>
        </p>
      </div>

      {/* Footer logos */}
      <div className="mt-12 flex items-center justify-center gap-6 opacity-60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/afcp.png" alt="AFCP" className="h-8 w-auto" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/ficem.png" alt="FICEM" className="h-8 w-auto" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/gcca.png" alt="GCCA" className="h-8 w-auto" />
      </div>
    </div>
  );
}
