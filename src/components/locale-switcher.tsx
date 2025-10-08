"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/dictionaries";
import { locales } from "@/i18n/dictionaries";

type LocaleSwitcherProps = {
  locale: Locale;
};

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const pathname = usePathname();

  const buildHref = (targetLocale: Locale) => {
    if (!pathname) {
      return `/${targetLocale}`;
    }

    const segments = pathname.split("/");
    if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
      segments[1] = targetLocale;
      const normalized = segments.filter(Boolean).join("/");
      return `/${normalized}`;
    }

    return `/${targetLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white/80 px-1 py-1 text-xs font-medium backdrop-blur">
      {locales.map((entry) => {
        const isActive = entry === locale;
        return (
          <Link
            key={entry}
            href={buildHref(entry)}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              isActive
                ? "bg-neutral-900 text-white"
                : "text-neutral-500 hover:text-neutral-900",
            )}
            aria-current={isActive ? "true" : undefined}
          >
            {entry.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
