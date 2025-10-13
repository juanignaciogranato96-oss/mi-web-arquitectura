"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProjectsClick = () => {
    onProjectsClick();
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (lang: LocaleKey) => {
    onLanguageChange(lang);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.35em] text-white sm:text-base"
          aria-label={labels.logo}
        >
          {labels.logo}
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={handleProjectsClick}
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

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white">
            {LANG_OPTIONS.map((option) => {
              const isActive = option === language;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleLanguageChange(option)}
                  className={`rounded-full px-2.5 py-1 transition ${
                    isActive
                      ? "bg-white text-black"
                      : "text-white/60 hover:text-white"
                  }`}
                  aria-pressed={isActive}
                >
                  {option.toUpperCase()}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white hover:bg-white/10 lg:hidden"
            aria-expanded={isMenuOpen}
            aria-label="Abrir menu de navegacion"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="lg:hidden">
          <div className="mx-auto mt-3 w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-white/15 bg-[#0a0a0a]/95 p-6 shadow-xl shadow-black/40">
              <nav className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={handleProjectsClick}
                  className="w-full rounded-full border border-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white/10 sm:px-6 sm:py-3"
                >
                  {labels.projects}
                </button>
                <Link
                  href="/presupuesto"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full rounded-full border border-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white/10 sm:px-6 sm:py-3"
                >
                  {labels.quote}
                </Link>
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1b4332] px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-black/20 transition-transform transition-colors hover:-translate-y-0.5 hover:scale-105 hover:bg-[#2d6a4f] sm:px-6 sm:py-3"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden />
                  <span>{labels.whatsapp}</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
