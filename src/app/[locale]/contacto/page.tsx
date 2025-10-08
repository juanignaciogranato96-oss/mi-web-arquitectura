import Link from "next/link";
import {
  getDictionary,
  defaultLocale,
  isLocale,
  type Locale,
} from "@/i18n/dictionaries";
import {
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
  CONTACT_EMAIL,
  SITE_NAME,
} from "@/config/site";

type ContactPageProps = {
  params: { locale: string };
};

const container = "mx-auto max-w-5xl px-4 sm:px-6";

export default function ContactPage({ params }: ContactPageProps) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dictionary = getDictionary(locale);
  const { hero, form, whatsapp } = dictionary.contact;

  return (
    <div className="space-y-16 py-16 sm:py-24">
      <section className={`${container} space-y-6 text-center sm:text-left`}>
        <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
          {hero.title}
        </h1>
        <p className="mx-auto max-w-3xl text-base text-neutral-500 sm:text-lg">
          {hero.description}
        </p>
      </section>

      <section className={`${container} grid gap-12 lg:grid-cols-[1.1fr,0.9fr]`}>
        <form className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm shadow-neutral-900/5">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-neutral-700"
              >
                {form.name}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="h-12 rounded-2xl border border-neutral-200 px-4 text-sm text-neutral-900 shadow-inner shadow-neutral-900/5 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-neutral-700"
              >
                {form.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="h-12 rounded-2xl border border-neutral-200 px-4 text-sm text-neutral-900 shadow-inner shadow-neutral-900/5 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-neutral-700"
            >
              {form.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 shadow-inner shadow-neutral-900/5 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-900/15 transition hover:-translate-y-0.5 hover:bg-neutral-800"
          >
            {form.submit}
          </button>
        </form>

        <aside className="flex flex-col gap-8 rounded-3xl border border-neutral-200 bg-neutral-900 p-8 text-white shadow-lg shadow-black/10">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">{whatsapp.title}</h2>
            <p className="text-sm text-neutral-200">{whatsapp.description}</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-neutral-200">{SITE_NAME}</p>
            <Link
              href={`mailto:${CONTACT_EMAIL}`}
              className="block text-neutral-200 transition hover:text-white"
            >
              {CONTACT_EMAIL}
            </Link>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-neutral-200 transition hover:text-white"
            >
              {WHATSAPP_DISPLAY}
            </Link>
          </div>
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-neutral-100"
          >
            {whatsapp.button}
          </Link>
        </aside>
      </section>
    </div>
  );
}
