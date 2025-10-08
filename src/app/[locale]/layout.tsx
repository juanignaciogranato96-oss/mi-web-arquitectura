import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/site-layout";
import {
  getDictionary,
  locales,
  defaultLocale,
  isLocale,
} from "@/i18n/dictionaries";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale)
    ? params.locale
    : defaultLocale;
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = isLocale(params.locale) ? params.locale : null;

  if (!locale) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <SiteLayout locale={locale} dictionary={dictionary}>
      {children}
    </SiteLayout>
  );
}
