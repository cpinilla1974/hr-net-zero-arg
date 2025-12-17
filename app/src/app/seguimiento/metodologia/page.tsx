"use client";

import Link from "next/link";
import {
  ChevronRight,
  FileText,
  CheckCircle,
  Database,
  Building2,
  Users,
  ArrowRight,
  Calculator,
  Target,
  Layers,
  Globe,
  BookOpen,
  Download,
} from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function MetodologiaContent() {
  // Indicadores clave del sistema MRV
  const indicadores = [
    {
      codigo: "92a",
      nombre: "Factor Clínker",
      descripcion: "Relación de clínker a cemento (clínker/cemento)",
      formula: "Σ[32] / Σ[42]",
      formulaDesc: "Σ Clínker consumido / Σ Producción de cemento",
      unidad: "%",
    },
    {
      codigo: "93",
      nombre: "Consumo Térmico Específico",
      descripcion: "Energía térmica requerida por tonelada de clínker",
      formula: "Σ[51] / Σ[31]",
      formulaDesc: "Σ Consumo térmico total / Σ Producción de clínker",
      unidad: "MJ/t clínker",
    },
    {
      codigo: "95",
      nombre: "Tasa de Sustitución Térmica",
      descripcion: "Sustitución de combustibles fósiles por alternativos",
      formula: "Σ[53+54] / Σ[51]",
      formulaDesc: "Σ (AFR fósil + Biomasa) / Σ Consumo térmico total",
      unidad: "%",
    },
    {
      codigo: "96",
      nombre: "Tasa de Biomasa",
      descripcion: "Participación de biomasa en el consumo térmico",
      formula: "Σ[54] / Σ[51]",
      formulaDesc: "Σ Energía de biomasa / Σ Consumo térmico total",
      unidad: "%",
    },
    {
      codigo: "91c",
      nombre: "Emisiones Netas de CO₂",
      descripcion: "Emisiones netas por tonelada de cemento producido",
      formula: "Σ[83] / Σ[42]",
      formulaDesc: "Σ Emisiones CO₂ netas / Σ Producción de cemento",
      unidad: "kgCO₂/t cemento",
    },
  ];

  // Fases del proceso MRV
  const fasesProceso = [
    {
      numero: 1,
      titulo: "Recolección de Datos",
      descripcion:
        "Las empresas cementeras registran datos de producción, consumo energético y emisiones en el formato GNR (Getting the Numbers Right).",
      responsable: "Empresas Cementeras",
      icon: Database,
    },
    {
      numero: 2,
      titulo: "Validación Interna",
      descripcion:
        "Cada empresa realiza validación interna de sus datos antes del envío, verificando consistencia y completitud.",
      responsable: "Empresas Cementeras",
      icon: CheckCircle,
    },
    {
      numero: 3,
      titulo: "Envío a FICEM",
      descripcion:
        "Los datos validados se envían al sistema MRV de FICEM para procesamiento y agregación regional.",
      responsable: "Empresas Cementeras",
      icon: ArrowRight,
    },
    {
      numero: 4,
      titulo: "Procesamiento y Agregación",
      descripcion:
        "FICEM procesa los datos, calcula indicadores agregados y genera reportes nacionales y regionales.",
      responsable: "FICEM",
      icon: Calculator,
    },
    {
      numero: 5,
      titulo: "Publicación de Resultados",
      descripcion:
        "Los resultados procesados se publican y se utilizan para el seguimiento de metas de descarbonización.",
      responsable: "FICEM",
      icon: Globe,
    },
  ];

  return (
    <>
      {/* Header con breadcrumb */}
      <header className="h-16 flex items-center justify-between px-6 lg:px-10 border-b border-gray-200 bg-white shrink-0">
        <div className="flex items-center gap-2 text-gray-600">
          <BookOpen className="w-5 h-5 text-[#5B9BD5]" />
          <Link href="/seguimiento" className="text-sm font-medium hover:text-[#5B9BD5] transition-colors">
            Seguimiento MRV
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#5B9BD5] text-sm font-medium">Metodología</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-white p-6 lg:p-10">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-2 border-b pb-6 border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#5B9BD5] bg-opacity-10 rounded-lg">
                  <FileText className="w-7 h-7 text-[#5B9BD5]" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1B3A5F]">
                  Metodología MRV FICEM
                </h1>
              </div>
              <a
                href="/docs/Protocolo_MRV_FICEM.pdf"
                download
                className="flex items-center gap-2 bg-[#5B9BD5] hover:bg-[#4a8bc4] text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm w-fit"
              >
                <Download className="w-4 h-4" />
                Descargar Protocolo PDF
              </a>
            </div>
            <p className="text-[#4A4A4A] text-base md:text-lg max-w-3xl mt-2">
              Sistema de Monitoreo, Reporte y Verificación para el seguimiento de emisiones
              y progreso hacia las metas de descarbonización del sector cementero.
            </p>
          </div>

          {/* Sección: Qué es el MRV */}
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-[#1B3A5F]">¿Qué es el Sistema MRV?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#f8fafc] to-white border border-gray-200 rounded-xl p-6">
                <p className="text-[#4A4A4A] leading-relaxed">
                  El <strong>Sistema MRV (Monitoreo, Reporte y Verificación)</strong> es una
                  plataforma desarrollada por FICEM para estandarizar la medición y seguimiento
                  de emisiones de CO₂ en la industria cementera de América Latina.
                </p>
                <p className="text-[#4A4A4A] leading-relaxed mt-4">
                  Este sistema está alineado con el{" "}
                  <strong>Protocolo CO₂ y Energía del Cemento CSI/GCCA Versión 3.1</strong>,
                  garantizando compatibilidad y comparabilidad internacional de los datos reportados.
                </p>
              </div>
              <div className="bg-[#1B3A5F] text-white rounded-xl p-6 flex flex-col justify-center">
                <h3 className="text-lg font-bold mb-4">Objetivos Principales</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-[#00A651] shrink-0 mt-0.5" />
                    <span className="text-sm">Estandarizar la medición de emisiones del sector</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Layers className="w-5 h-5 text-[#00A651] shrink-0 mt-0.5" />
                    <span className="text-sm">Permitir agregación de datos a nivel nacional y regional</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00A651] shrink-0 mt-0.5" />
                    <span className="text-sm">Garantizar transparencia y trazabilidad de la información</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-[#00A651] shrink-0 mt-0.5" />
                    <span className="text-sm">Facilitar el seguimiento de compromisos Net Zero</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Sección: Proceso MRV */}
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#1B3A5F]">Proceso de Monitoreo y Verificación</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fasesProceso.map((fase) => {
                const Icon = fase.icon;
                return (
                  <div
                    key={fase.numero}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#5B9BD5] flex items-center justify-center text-white text-sm font-bold">
                        {fase.numero}
                      </div>
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Icon className="w-5 h-5 text-[#5B9BD5]" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-[#1B3A5F] mb-2">{fase.titulo}</h3>
                    <p className="text-sm text-[#4A4A4A] mb-3">{fase.descripcion}</p>
                    <div className="flex items-center gap-2">
                      {fase.responsable === "Empresas Cementeras" ? (
                        <Building2 className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Users className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-xs text-gray-500 font-medium">{fase.responsable}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Sección: Indicadores Clave */}
          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-[#1B3A5F]">Indicadores Clave de Desempeño</h2>
              <p className="text-[#4A4A4A]">
                Los siguientes indicadores son monitoreados según las definiciones del protocolo GNR
                (Getting the Numbers Right) de la GCCA.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1B3A5F] text-white">
                    <th className="text-left p-4 font-semibold text-sm rounded-tl-lg">Código</th>
                    <th className="text-left p-4 font-semibold text-sm">Indicador</th>
                    <th className="text-left p-4 font-semibold text-sm">Descripción</th>
                    <th className="text-left p-4 font-semibold text-sm">Unidad</th>
                    <th className="text-left p-4 font-semibold text-sm rounded-tr-lg">Fórmula (Códigos GNR)</th>
                  </tr>
                </thead>
                <tbody>
                  {indicadores.map((ind, idx) => (
                    <tr
                      key={ind.codigo}
                      className={`border-b border-gray-100 ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition-colors`}
                    >
                      <td className="p-4">
                        <span className="bg-[#5B9BD5] text-white text-xs font-bold px-2.5 py-1 rounded">
                          {ind.codigo}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-[#1B3A5F]">{ind.nombre}</td>
                      <td className="p-4 text-sm text-[#4A4A4A]">{ind.descripcion}</td>
                      <td className="p-4 text-sm font-mono text-[#4A4A4A]">{ind.unidad}</td>
                      <td className="p-4">
                        <code className="bg-[#1B3A5F] text-white text-xs font-mono px-2 py-1 rounded">
                          {ind.formula}
                        </code>
                        <p className="text-xs text-gray-500 mt-1">{ind.formulaDesc}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Sección: Marco Normativo */}
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-[#1B3A5F]">Marco Normativo y Referencias</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-[#f8fafc] to-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
                <div className="p-2.5 bg-[#00A651] bg-opacity-10 rounded-lg w-fit">
                  <Globe className="w-5 h-5 text-[#00A651]" />
                </div>
                <h3 className="font-bold text-[#1B3A5F]">GCCA Net Zero Roadmap</h3>
                <p className="text-sm text-[#4A4A4A]">
                  Hoja de ruta global de la industria cementera para alcanzar emisiones netas
                  cero de CO₂ al 2050.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#f8fafc] to-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
                <div className="p-2.5 bg-[#5B9BD5] bg-opacity-10 rounded-lg w-fit">
                  <FileText className="w-5 h-5 text-[#5B9BD5]" />
                </div>
                <h3 className="font-bold text-[#1B3A5F]">Protocolo CSI/GCCA v3.1</h3>
                <p className="text-sm text-[#4A4A4A]">
                  Estándar internacional para la medición y reporte de emisiones de CO₂ y
                  consumo energético en la industria del cemento.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#f8fafc] to-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
                <div className="p-2.5 bg-orange-500 bg-opacity-10 rounded-lg w-fit">
                  <Layers className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-bold text-[#1B3A5F]">Sistema GNR</h3>
                <p className="text-sm text-[#4A4A4A]">
                  Base de datos global &quot;Getting the Numbers Right&quot; que recopila y reporta
                  indicadores de la industria cementera mundial.
                </p>
              </div>
            </div>
          </section>

          {/* CTA - Volver al Dashboard */}
          <div className="bg-gradient-to-r from-[#1B3A5F] to-[#2E5A8B] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-2">¿Listo para comenzar?</h3>
              <p className="text-blue-100 text-sm">
                Accede al sistema de seguimiento para cargar datos o consultar resultados.
              </p>
            </div>
            <Link
              href="/seguimiento"
              className="bg-[#00A651] hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              Ir al Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default function MetodologiaPage() {
  return (
    <ProtectedRoute allowedRoles={["INFORMANTE_EMPRESA", "ADMIN_PROCESO"]}>
      <MetodologiaContent />
    </ProtectedRoute>
  );
}
