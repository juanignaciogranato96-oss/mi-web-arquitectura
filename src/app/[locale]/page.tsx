import Link from "next/link";
import Image from "next/image";
import {
  getDictionary,
  defaultLocale,
  isLocale,
  type Locale,
} from "@/i18n/dictionaries";
import { WHATSAPP_URL } from "@/config/site";

type HomePageProps = {
  params: { locale: string };
};

const container = "mx-auto max-w-6xl px-4 sm:px-6";

export default function HomePage({ params }: HomePageProps) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dictionary = getDictionary(locale);
  const { hero, services, whatsappCta } = dictionary.home;

  const heroImageAlt =
    locale === "es"
      ? "Render exterior de vivienda moderna al atardecer"
      : "Exterior render of a modern residence at sunset";

  return (
    <div className="space-y-24 py-16 sm:py-24">
      <section className={`${container} grid gap-12 lg:grid-cols-[1fr,0.9fr]`}>
        <div className="flex flex-col justify-center gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
            {hero.eyebrow}
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="text-base text-neutral-500 sm:text-lg">
            {hero.description}
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <Link
              href={`/${locale}/contacto`}
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-900/15 transition hover:-translate-y-0.5 hover:bg-neutral-800"
            >
              {hero.primaryCta}
            </Link>
            <Link
              href={`/${locale}/servicios`}
              className="rounded-full border border-neutral-900/20 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900/40 hover:bg-neutral-900/5"
            >
              {hero.secondaryCta}
            </Link>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-500/30 hover:bg-emerald-500/20"
            >
              {dictionary.nav.whatsapp}
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 -translate-x-6 -translate-y-6 rounded-3xl bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 shadow-2xl shadow-neutral-900/10">
            <Image
              src="/images/proyectos/casa-funes.webp"
              alt={heroImageAlt}
              width={960}
              height={640}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className={`${container} space-y-12`}>
        <div className="flex flex-col gap-4 sm:w-3/4">
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            {services.title}
          </h2>
          <p className="text-base text-neutral-500 sm:text-lg">
            {services.description}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.items.map((item, index) => (
            <div
              key={item.title}
              className="group flex h-full flex-col gap-3 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-900/5 transition hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-900/10"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-semibold text-neutral-900">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-500">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${container}`}>
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-900 px-6 py-12 text-white sm:px-10 md:px-16">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)] md:block" />
          <div className="relative flex flex-col gap-6 md:w-3/4">
            <h3 className="text-3xl font-semibold leading-tight">
              {whatsappCta.title}
            </h3>
            <p className="text-base text-neutral-200">{whatsappCta.description}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-neutral-100"
              >
                {whatsappCta.button}
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
