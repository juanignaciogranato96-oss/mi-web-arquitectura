import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

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
      <body className="flex min-h-screen flex-col bg-neutral-100 text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
