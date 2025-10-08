import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import type { Locale, SiteDictionary } from "@/i18n/dictionaries";

type SiteLayoutProps = {
  locale: Locale;
  dictionary: SiteDictionary;
  children: ReactNode;
};

export function SiteLayout({ locale, dictionary, children }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </div>
  );
}
