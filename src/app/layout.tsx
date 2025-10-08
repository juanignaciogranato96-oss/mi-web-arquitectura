import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { defaultLocale, getDictionary, isLocale } from "@/i18n/dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: getDictionary(defaultLocale).metadata.title,
  description: getDictionary(defaultLocale).metadata.description,
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: string };
}>) {
  const locale =
    params?.locale && isLocale(params.locale) ? params.locale : defaultLocale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-50 text-neutral-900`}
      >
        {children}
      </body>
    </html>
  );
}
