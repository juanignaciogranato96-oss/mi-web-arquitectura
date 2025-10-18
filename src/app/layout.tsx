import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { GeistSans } from "geist/font/sans";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import "./globals.css";

const WHATSAPP_URL = "https://wa.me/543415799316";
const SITE_NAME_ES = "J.G. Diseno y visualizacion arquitectonica";
const SITE_NAME_EN = "J.G. Architectural design and visualization studio";
const SITE_DESCRIPTION_ES =
  "Estudio especializado en diseno arquitectonico, renders 3D y regularizacion de obra en Rosario y Argentina.";
const SITE_DESCRIPTION_EN =
  "Architecture studio delivering 3D visualization, architectural design, and permitting services in Rosario and across Argentina.";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jg-diseno-arquitectura.com"; // TODO: Confirmar dominio oficial para metadataBase.

// FIX: Enriquecer metadatos base para SEO y redes sociales en ambos idiomas.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME_ES}`,
    default: `${SITE_NAME_ES} - ${SITE_NAME_EN}`,
  },
  description: `${SITE_DESCRIPTION_ES} ${SITE_DESCRIPTION_EN}`,
  keywords: [
    "render 3D",
    "visualizacion arquitectonica",
    "arquitectura Rosario",
    "diseno arquitectonico",
    "arquitectura comercial",
    "architectural visualization",
    "3D rendering studio",
    "Rosario architecture",
  ],
  authors: [{ name: "Juan Granato" }],
  creator: "J.G. Visual Estudio",
  publisher: "J.G. Visual Estudio",
  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      en: "/?lang=en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: SITE_NAME_ES,
    title: `${SITE_NAME_ES} - ${SITE_NAME_EN}`,
    description: `${SITE_DESCRIPTION_ES} ${SITE_DESCRIPTION_EN}`,
    images: [
      {
        url: "/images/hero.webp",
        width: 1920,
        height: 1080,
        alt: `${SITE_NAME_ES} renders 3D`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME_ES} - ${SITE_NAME_EN}`,
    description: `${SITE_DESCRIPTION_ES} ${SITE_DESCRIPTION_EN}`,
    images: ["/images/hero.webp"],
  },
};

// FIX: Ajustar viewport para mobile-first y colores del navegador.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${GeistSans.variable} bg-neutral-100 font-sans text-neutral-900 antialiased`}
      >
        <SmoothScrollProvider>
          {/* FIX: Usar main semantico para el contenido principal del sitio. */}
          <main className="flex min-h-screen flex-col">{children}</main>
        </SmoothScrollProvider>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#1b4332] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1b4332]/35 transition-transform transition-colors hover:-translate-y-1 hover:scale-105 hover:bg-[#2d6a4f] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1b4332]/60"
          aria-label="Contactar al estudio J.G. Diseno y visualizacion arquitectonica por WhatsApp"
        >
          <FaWhatsapp className="h-5 w-5" aria-hidden />
          <span>WhatsApp</span>
        </a>
      </body>
    </html>
  );
}
