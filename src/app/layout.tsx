import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/Footer";

const WHATSAPP_URL = "https://wa.me/543415799316";

export const metadata: Metadata = {
  title: "JG Visual Estudio",
  description:
    "Diseno arquitectonico, renders y regularizacion de obra en Rosario y Funes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-neutral-100 text-neutral-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center rounded-full bg-[#3B806B] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#3B806B]/30 transition hover:-translate-y-1 hover:bg-[#326c5b]"
          aria-label="Abrir WhatsApp"
        >
          WhatsApp
        </a>
      </body>
    </html>
  );
}
