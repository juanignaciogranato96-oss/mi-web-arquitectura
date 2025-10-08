import {
  getDictionary,
  defaultLocale,
  isLocale,
  type Locale,
} from "@/i18n/dictionaries";

type StudioPageProps = {
  params: { locale: string };
};

const container = "mx-auto max-w-6xl px-4 sm:px-6";

export default function StudioPage({ params }: StudioPageProps) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dictionary = getDictionary(locale);
  const { hero, team, philosophy, clients, process, location } =
    dictionary.studio;

  return (
    <div className="space-y-20 py-16 sm:py-24">
      <section className={`${container} space-y-6`}>
        <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
          {hero.title}
        </h1>
        <p className="text-base text-neutral-500 sm:text-lg">
          {hero.description}
        </p>
      </section>

      <section className={`${container} space-y-10`}>
        <h2 className="text-2xl font-semibold text-neutral-900">{team.title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {team.members.map((member) => (
            <article
              key={member.name}
              className="flex h-full flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-900/5"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-base font-semibold text-white">
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {member.name}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
                    {member.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-neutral-500">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${container} grid gap-8 md:grid-cols-2`}>
        <article className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm shadow-neutral-900/5">
          <h2 className="text-2xl font-semibold text-neutral-900">
            {philosophy.title}
          </h2>
          <p className="mt-4 text-sm text-neutral-500 sm:text-base">
            {philosophy.description}
          </p>
        </article>
        <article className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm shadow-neutral-900/5">
          <h2 className="text-2xl font-semibold text-neutral-900">
            {location.title}
          </h2>
          <p className="mt-4 text-sm text-neutral-500 sm:text-base">
            {location.description}
          </p>
        </article>
      </section>

      <section className={`${container} grid gap-8 lg:grid-cols-[1.2fr,1fr]`}>
        <article className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm shadow-neutral-900/5">
          <h2 className="text-2xl font-semibold text-neutral-900">
            {process.title}
          </h2>
          <ol className="mt-6 space-y-4">
            {process.steps.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-3xl border border-neutral-200/80 bg-neutral-50 px-4 py-4"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-500">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm shadow-neutral-900/5">
          <h2 className="text-2xl font-semibold text-neutral-900">
            {clients.title}
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-neutral-500 sm:text-base">
            {clients.items.map((client) => (
              <li
                key={client}
                className="flex items-center gap-3 rounded-3xl border border-neutral-200/70 bg-neutral-50 px-4 py-3"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                <span>{client}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
