import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FaWhatsapp } from "react-icons/fa";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const WHATSAPP_URL = "https://wa.me/543415799316";

export const metadata: Metadata = {
  title: "JG Visual Estudio",
  description:
    "Diseño arquitectónico, renders y regularización de obra en Rosario y Funes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${plusJakarta.variable} bg-neutral-100 font-sans text-neutral-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col">{children}</div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#1b4332] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1b4332]/35 transition-transform transition-colors hover:-translate-y-1 hover:scale-105 hover:bg-[#2d6a4f] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1b4332]/60"
          aria-label="Contactarte por WhatsApp"
        >
          <FaWhatsapp className="h-5 w-5" aria-hidden />
          <span>Contactarte</span>
        </a>
      </body>
    </html>
  );
}
