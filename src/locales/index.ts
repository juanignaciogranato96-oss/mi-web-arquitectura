import es from "./es.json";
import en from "./en.json";

export const translations = {
  es,
  en,
} as const;

export type LocaleKey = keyof typeof translations;

export function getCopy(locale: LocaleKey) {
  return translations[locale] ?? translations.es;
}
