import Link from "next/link";
import {
  getDictionary,
  defaultLocale,
  isLocale,
  type Locale,
} from "@/i18n/dictionaries";
import { WHATSAPP_URL } from "@/config/site";

type ServicesPageProps = {
  params: { locale: string };
};

const container = "mx-auto max-w-6xl px-4 sm:px-6";

export default function ServicesPage({ params }: ServicesPageProps) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dictionary = getDictionary(locale);
  const { hero, sections, cta } = dictionary.services;

  return (
    <div className="space-y-20 py-16 sm:py-24">
      <section className={`${container} space-y-6`}>
        <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
          {hero.title}
        </h1>
        <p className="text-base text-neutral-500 sm:text-lg">{hero.description}</p>
      </section>

      <section className={`${container} grid gap-8`}>
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm shadow-neutral-900/5 transition hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-900/10 md:p-10"
          >
            <h2 className="text-2xl font-semibold text-neutral-900">
              {section.title}
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-neutral-500 sm:text-base">
              {section.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 rounded-2xl border border-neutral-200/60 bg-neutral-50 px-4 py-3 text-neutral-600"
                >
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className={`${container}`}>
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-900 px-6 py-12 text-white sm:px-10 md:px-16">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_65%)] md:block" />
          <div className="relative flex flex-col gap-6 md:w-4/6">
            <h2 className="text-3xl font-semibold leading-tight">{cta.title}</h2>
            <p className="text-base text-neutral-200">{cta.description}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-neutral-100"
              >
                {cta.button}
              </Link>
              <Link
                href={`/${locale}/contacto`}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                {dictionary.nav.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
