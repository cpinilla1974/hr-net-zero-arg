"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  Upload,
  CheckCircle,
  GitMerge,
  LineChart,
  ArrowRight,
  Users,
  Building2,
  TrendingUp,
  FileCheck,
  ChevronRight,
  Send,
  Eye,
} from "lucide-react";

export default function SeguimientoPage() {
  const { user, isAuthenticated } = useAuth();

  // Flujo simplificado del proceso MRV
  const processSteps = [
    {
      number: 1,
      title: "Cargar Datos",
      description: "Informante carga archivos GNR y Adicionales en estado borrador",
      icon: Upload,
      color: "bg-blue-500",
      roles: ["INFORMANTE_EMPRESA"],
      href: "/seguimiento/submit-data",
      status: "BORRADOR"
    },
    {
      number: 2,
      title: "Enviar a FICEM",
      description: "Informante envía el reporte directamente a FICEM para procesamiento",
      icon: Send,
      color: "bg-green-500",
      roles: ["INFORMANTE_EMPRESA"],
      href: "/seguimiento/submit-data",
      status: "ENVIADO"
    },
    {
      number: 3,
      title: "Procesar Datos",
      description: "FICEM procesa, valida y agrega los datos nacionales",
      icon: GitMerge,
      color: "bg-orange-500",
      roles: ["ADMIN_PROCESO"],
      href: "/seguimiento/process",
      status: "EN_PROCESO"
    },
    {
      number: 4,
      title: "Publicar Resultados",
      description: "FICEM publica resultados procesados y trayectorias nacionales",
      icon: LineChart,
      color: "bg-emerald-600",
      roles: ["ADMIN_PROCESO"],
      href: "/seguimiento/results",
      status: "COMPLETADO"
    }
  ];

  // Obtener el paso actual según el rol (flujo simplificado)
  const getCurrentStep = () => {
    if (!user) return null;
    // INFORMANTE_EMPRESA: Pasos 1-2 (Cargar y Enviar)
    if (user.role === "INFORMANTE_EMPRESA") return 0;
    // ADMIN_PROCESO: Pasos 3-4 (Procesar y Publicar)
    if (user.role === "ADMIN_PROCESO") return 2;
    return null;
  };

  const currentStep = getCurrentStep();

  // Obtener acciones rápidas según el rol
  const getQuickActions = () => {
    if (!user) return [];

    if (user.role === "INFORMANTE_EMPRESA") {
      return [
        {
          title: "Enviar Datos",
          description: "Cargar archivos y enviar reporte anual",
          icon: Upload,
          href: "/seguimiento/submit-data",
          color: "bg-blue-500"
        },
        {
          title: "Ver Resultados",
          description: "Consultar resultados procesados",
          icon: Eye,
          href: "/seguimiento/results",
          color: "bg-green-500"
        }
      ];
    }

    if (user.role === "ADMIN_PROCESO") {
      return [
        {
          title: "Procesar Reportes",
          description: "Revisar y procesar reportes enviados",
          icon: GitMerge,
          href: "/seguimiento/process",
          color: "bg-orange-500"
        },
        {
          title: "Ver Resultados",
          description: "Consultar agregado nacional",
          icon: LineChart,
          href: "/seguimiento/results",
          color: "bg-emerald-600"
        }
      ];
    }

    return [];
  };

  const quickActions = getQuickActions();

  // Estadísticas generales
  const stats = [
    { label: "Empresas Participantes", value: "4", icon: Building2 },
    { label: "Años Monitoreados", value: "2024", icon: TrendingUp },
    { label: "Indicadores Clave", value: "7", icon: FileCheck },
    { label: "Usuarios Activos", value: "11", icon: Users }
  ];

  // Función para obtener el label del rol en español (flujo simplificado)
  const getRoleLabel = (role: string) => {
    switch (role) {
      case "INFORMANTE_EMPRESA":
        return "Informante Empresa";
      case "ADMIN_PROCESO":
        return "Administrador FICEM";
      default:
        return role;
    }
  };

  return (
    <>
      {/* Header con breadcrumb y usuario */}
      <header className="h-16 flex items-center justify-between px-6 lg:px-10 border-b border-gray-200 bg-white shrink-0">
        <div className="flex items-center gap-2 text-gray-600">
          <TrendingUp className="w-5 h-5 text-[#5B9BD5]" />
          <span className="text-sm font-medium">Seguimiento MRV</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#5B9BD5] text-sm font-medium">Dashboard Principal</span>
        </div>
        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{getRoleLabel(user.role)}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#5B9BD5] flex items-center justify-center text-white text-sm font-semibold">
              {user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 overflow-y-auto bg-white p-6 lg:p-10">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-1 border-b pb-6 border-gray-100">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1B3A5F]">
              Sistema de Seguimiento MRV
            </h1>
            <p className="text-[#4A4A4A] text-base md:text-lg">
              Plataforma centralizada para el monitoreo, reporte y verificación de emisiones del sector cementero.
            </p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-32">
              <p className="text-[#4A4A4A] text-sm font-medium">Empresas Participantes</p>
              <h3 className="text-4xl font-bold text-[#5B9BD5]">4</h3>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-32">
              <p className="text-[#4A4A4A] text-sm font-medium">Años Monitoreados</p>
              <h3 className="text-4xl font-bold text-[#00A651]">2024</h3>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-32">
              <p className="text-[#4A4A4A] text-sm font-medium">Indicadores Clave</p>
              <h3 className="text-4xl font-bold text-[#5B9BD5]">7</h3>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-32">
              <p className="text-[#4A4A4A] text-sm font-medium">Usuarios Activos</p>
              <h3 className="text-4xl font-bold text-[#00A651]">11</h3>
            </div>
          </div>

          {/* Acciones Rápidas */}
          {quickActions.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-[#1B3A5F]">Acciones Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={idx}
                      href={action.href}
                      className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#5B9BD5] transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${action.color} bg-opacity-10`}>
                          <Icon className={`w-6 h-6 ${action.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#5B9BD5] transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#5B9BD5] transition-colors" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Flujo del Proceso Simplificado */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#1B3A5F] mb-2">Flujo del Proceso MRV Simplificado</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                const isCurrentUserStep = currentStep !== null && (
                  (currentStep === 0 && idx <= 1) ||
                  (currentStep === 2 && idx >= 2)
                );
                const canAccess = user && step.roles.includes(user.role);

                return (
                  <div
                    key={idx}
                    className={`group relative flex flex-col p-5 bg-white border rounded-xl transition-all shadow-sm ${
                      isCurrentUserStep
                        ? "border-2 border-[#5B9BD5] shadow-md"
                        : "border-gray-200"
                    } ${!canAccess ? "opacity-50" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        isCurrentUserStep ? "text-[#5B9BD5]" : "text-gray-500"
                      }`}>
                        Paso {step.number}
                      </span>
                      {isCurrentUserStep && (
                        <div className="bg-[#5B9BD5] text-white rounded-full p-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <div className={`p-2.5 rounded-lg ${step.color} bg-opacity-10 w-fit mb-3`}>
                      <Icon className={`w-5 h-5 ${step.color.replace('bg-', 'text-')}`} />
                    </div>
                    <h3 className="text-sm font-bold text-[#1B3A5F] mb-1.5 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#4A4A4A] line-clamp-2">
                      {step.description}
                    </p>
                    {idx < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute -right-2 top-1/2 transform -translate-y-1/2 z-10">
                        <ChevronRight className={`w-5 h-5 ${
                          isCurrentUserStep ? "text-[#5B9BD5]" : "text-gray-300"
                        }`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Acceso rápido a Resultados */}
          <div className="bg-[#2E5A8B] rounded-xl overflow-hidden shadow-md relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1B3A5F] to-[#2E5A8B] opacity-90"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white opacity-5"></div>
            <div className="relative z-10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-6 h-6 text-[#00A651]" />
                  <h2 className="text-xl font-bold text-white">Resultados y Trayectorias</h2>
                </div>
                <p className="text-blue-100 mb-4 text-sm max-w-2xl">
                  Visualice el progreso hacia las metas Net Zero y el impacto de las estrategias de descarbonización.
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-white">
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                    <LineChart className="w-4 h-4" />
                    Análisis de Tendencias
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                    <TrendingUp className="w-4 h-4" />
                    Emisiones Proyectadas
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                    <ArrowRight className="w-4 h-4" />
                    Agregado Nacional
                  </div>
                </div>
              </div>
              <Link
                href="/seguimiento/results"
                className="bg-[#00A651] hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                Ver Resultados
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Empresas participantes */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-[#4A4A4A]">Empresas Colaboradoras</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Holcim Argentina", logo: "/logos/companies/holcim.png" },
                { name: "Loma Negra", logo: "/logos/companies/loma-negra.png" },
                { name: "Avellaneda", logo: "/logos/companies/avellaneda.png" },
                { name: "PCR", logo: "/logos/companies/pcr.svg" }
              ].map((company, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 rounded-lg p-6 flex flex-col items-center justify-center text-center gap-3 hover:shadow-md transition-all h-32"
                >
                  <div className="h-12 w-full flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="max-h-12 max-w-full object-contain"
                    />
                  </div>
                  <span className="text-xs font-medium text-[#7A7A7A]">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}