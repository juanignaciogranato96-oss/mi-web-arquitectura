import type { LocaleKey } from "@/locales";

export const SUPPORTED_LOCALES = ["es", "en"] as const;
export const DEFAULT_LOCALE: LocaleKey = "es";

export function isSupportedLocale(locale: string): locale is LocaleKey {
  return SUPPORTED_LOCALES.includes(locale as LocaleKey);
}
