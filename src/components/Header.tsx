"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

export type LanguageCode = "es" | "en";

type HeaderProps = {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onProjectsClick: () => void;
};

const LANG_OPTIONS: LanguageCode[] = ["es", "en"];

const WHATSAPP_URL = "https://wa.me/543415799316";

export function Header({ language, onLanguageChange, onProjectsClick }: HeaderProps) {
  const projectLabel = useMemo(
    () => (language === "es" ? "Ver proyectos" : "View projects"),
    [language],
  );

  const quoteLabel = language === "es" ? "Solicitar presupuesto" : "Request a quote";
  const whatsappLabel = language === "es" ? "WhatsApp" : "WhatsApp";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-white">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20">
            <Image
              src="/images/logos/logo-jg.webp"
              alt="Logo JG Visual Estudio"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </div>
          <span className="text-sm font-semibold uppercase tracking-[0.3em]">
            JG Visual Estudio
          </span>
        </Link>

        <nav className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={onProjectsClick}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white/10"
          >
            {projectLabel}
          </button>
          <Link
            href="/contacto"
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white/10"
          >
            {quoteLabel}
          </Link>
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#3B806B] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#326c5b]"
          >
            {whatsappLabel}
          </Link>
        </nav>

        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white">
          {LANG_OPTIONS.map((option) => {
            const isActive = option === language;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onLanguageChange(option)}
                className={`rounded-full px-2.5 py-1 transition ${
                  isActive ? "bg-white text-black" : "text-white/60 hover:text-white"
                }`}
              >
                {option.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
