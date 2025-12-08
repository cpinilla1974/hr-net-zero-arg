import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/navigation/BottomNav";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopNav } from "@/components/navigation/TopNav";
import { AuthProvider } from "@/contexts/AuthContext";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Net Zero Argentina 2050 | Cemento y Hormigón",
  description: "Hoja de Ruta hacia la neutralidad de carbono de la industria del cemento y hormigón en Argentina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${publicSans.variable} font-sans antialiased`}>
        <AuthProvider>
          <div className="layout-with-sidebar">
            {/* Sidebar - solo visible en desktop */}
            <Sidebar />

            {/* Contenido principal */}
            <div className="main-content relative flex min-h-screen w-full flex-col pb-20 md:pb-0">
              {/* TopNav - visible solo en tablet */}
              <TopNav />
              {children}
            </div>
          </div>

          {/* Bottom Nav - solo visible en móvil/tablet */}
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
