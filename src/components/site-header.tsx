import Link from "next/link";
import { NavigationLinks, type NavigationItem } from "./navigation-links";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNavigation } from "./mobile-navigation";
import type { Locale, SiteDictionary } from "@/i18n/dictionaries";
import { WHATSAPP_URL, SITE_NAME } from "@/config/site";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const navigation: NavigationItem[] = [
    { label: dictionary.nav.home, href: `/${locale}` },
    { label: dictionary.nav.services, href: `/${locale}/servicios` },
    { label: dictionary.nav.studio, href: `/${locale}/empresa` },
    { label: dictionary.nav.contact, href: `/${locale}/contacto` },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-900 font-semibold text-white shadow-inner shadow-white/10">
            JG
          </span>
          <span className="hidden flex-col text-sm font-medium leading-tight text-neutral-700 sm:flex">
            <span className="text-neutral-900">{SITE_NAME}</span>
            <span className="text-xs text-neutral-500">
              {dictionary.nav.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavigationLinks items={navigation} />
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher locale={locale} />
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-neutral-900/10 transition hover:-translate-y-0.5 hover:bg-neutral-800"
          >
            {dictionary.nav.whatsapp}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitcher locale={locale} />
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-200 bg-white/80 px-3 py-2 text-xs font-semibold text-neutral-900 backdrop-blur transition hover:border-neutral-300"
          >
            {dictionary.nav.whatsapp}
          </Link>
        </div>

        <MobileNavigation items={navigation} label={dictionary.nav.menu} />
      </div>
    </header>
  );
}
