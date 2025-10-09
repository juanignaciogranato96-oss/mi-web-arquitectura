"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import type { LocaleKey } from "@/locales";

type HeaderLabels = {
  logo: string;
  projects: string;
  quote: string;
  whatsapp: string;
};

type HeaderProps = {
  labels: HeaderLabels;
  language: LocaleKey;
  onLanguageChange: (lang: LocaleKey) => void;
  onProjectsClick: () => void;
  whatsappUrl: string;
};

const LANG_OPTIONS: LocaleKey[] = ["es", "en"];

export function Header({
  labels,
  language,
  onLanguageChange,
  onProjectsClick,
  whatsappUrl,
}: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/65 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.35em] text-white sm:text-sm"
          aria-label={labels.logo}
        >
          {labels.logo}
        </Link>
        <nav className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={onProjectsClick}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white/10"
          >
            {labels.projects}
          </button>
          <Link
            href="/presupuesto"
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white/10"
          >
            {labels.quote}
          </Link>
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1b4332] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-black/20 transition-transform transition-colors hover:-translate-y-0.5 hover:scale-105 hover:bg-[#2d6a4f]"
          >
            <FaWhatsapp className="h-3.5 w-3.5" aria-hidden />
            <span>{labels.whatsapp}</span>
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
                aria-pressed={isActive}
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
