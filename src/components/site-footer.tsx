import Link from "next/link";
import type { Locale, SiteDictionary } from "@/i18n/dictionaries";
import {
  CONTACT_EMAIL,
  SITE_NAME,
  SOCIAL_LINKS,
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
} from "@/config/site";

type SiteFooterProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

const SOCIAL_LABELS: Record<Locale, Record<keyof typeof SOCIAL_LINKS, string>> = {
  es: {
    instagram: "Instagram",
    behance: "Behance",
    linkedin: "LinkedIn",
  },
  en: {
    instagram: "Instagram",
    behance: "Behance",
    linkedin: "LinkedIn",
  },
};

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  const year = new Date().getFullYear().toString();
  const rights = dictionary.footer.rights.replace("{year}", year);
  const socialLabels = SOCIAL_LABELS[locale];

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3">
          <h2 className="text-lg font-semibold text-neutral-900">{SITE_NAME}</h2>
          <p className="text-sm text-neutral-500">{dictionary.nav.tagline}</p>
          <p className="text-sm text-neutral-500">Rosario · Funes · Argentina</p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
              {dictionary.footer.contact}
            </h3>
            <div className="space-y-2 text-sm text-neutral-500">
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                className="block hover:text-neutral-900"
              >
                {CONTACT_EMAIL}
              </Link>
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-neutral-900"
              >
                {WHATSAPP_DISPLAY}
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
              {dictionary.footer.followUs}
            </h3>
            <div className="flex gap-4 text-sm text-neutral-500">
              {Object.entries(SOCIAL_LINKS).map(([key, url]) => (
                <Link
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900"
                >
                  {socialLabels[key as keyof typeof SOCIAL_LINKS]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 bg-white py-6">
        <p className="mx-auto max-w-6xl px-4 text-xs text-neutral-400 sm:px-6">
          {rights}
        </p>
      </div>
    </footer>
  );
}
