import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
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
          className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1b4332] text-white shadow-lg shadow-[#1b4332]/35 transition-transform transition-colors hover:-translate-y-1 hover:scale-105 hover:bg-[#2d6a4f] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1b4332]/60"
          aria-label="Abrir WhatsApp"
        >
          <svg
            className="h-7 w-7"
            viewBox="0 0 32 32"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16.027 4C9.92 4 4.99 8.93 5 15.037c.002 2.042.555 3.944 1.52 5.59l-1.995 7.29 7.48-1.97A11.01 11.01 0 0 0 16.027 26C22.135 26 27.065 21.07 27.055 14.963 27.045 8.855 22.13 4 16.027 4zm6.613 16.225c-.297.84-1.753 1.6-2.427 1.71-.62.1-1.414.187-2.285-.143-.527-.203-1.203-.393-2.072-.766-3.65-1.578-6.02-5.27-6.207-5.516-.18-.247-1.48-1.968-1.48-3.756 0-1.788.94-2.675 1.273-3.045.335-.37.73-.463.973-.463.244 0 .487.002.7.013.226.01.53-.086.83.63.297.716 1.012 2.47 1.1 2.648.085.18.142.39.026.637-.114.247-.17.39-.33.6-.166.21-.35.47-.5.63-.163.16-.332.335-.144.66.19.32.846 1.39 1.815 2.247 1.243 1.108 2.287 1.455 2.61 1.62.322.166.51.144.7-.085.19-.228.804-.936 1.02-1.258.213-.32.44-.26.73-.16.29.095 1.85.87 2.168 1.026.318.155.53.228.61.35.08.122.08.7-.218 1.54z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
