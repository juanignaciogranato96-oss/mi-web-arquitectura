import Link from "next/link";

const SOCIAL_LINKS = [
  {
    href: "https://instagram.com/jg_archviz",
    label: "Instagram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5" />
        <circle cx="12" cy="12" r="4.25" />
        <circle cx="17.25" cy="6.75" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://behance.net/juangranato2",
    label: "Behance",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M3 6.5h5a3.5 3.5 0 1 1 0 7H3z" />
        <path d="M3 13.5h5.3A3.7 3.7 0 0 1 12 17.2v0a3.7 3.7 0 0 1-3.7 3.7H3z" />
        <path d="M15.5 12.5H21v1.2a3.3 3.3 0 1 1-3.3-3.3 3.3 3.3 0 0 1 3.3 3.3" />
        <path d="M15 7h6" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com",
    label: "LinkedIn",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M4.75 9.5h3.5v10.5h-3.5z" />
        <circle cx="6.5" cy="5.5" r="2" />
        <path d="M11.75 9.5h3.2v1.6c.6-1 1.7-1.9 3.5-1.9 2.7 0 4.8 1.8 4.8 5.6v5.2h-3.5v-4.8c0-1.6-.5-2.7-2-2.7-1.1 0-1.8.7-2.1 1.4-.1.2-.1.6-.1.9v5.2h-3.5z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-[#111] text-[#f1f1f1]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1 text-sm">
          <p className="text-base font-semibold uppercase tracking-[0.2em] text-white">
            JG Visual Estudio
          </p>
          <p>Rosario - Funes</p>
          <p>Tel: 0341 5799316</p>
          <Link
            href="mailto:contacto@jgvisual.com"
            className="transition hover:text-white"
          >
            contacto@jgvisual.com
          </Link>
        </div>
        <div className="flex gap-4">
          {SOCIAL_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:-translate-y-1 hover:border-[#C2A85F] hover:text-[#C2A85F]"
              aria-label={item.label}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
      <p className="border-t border-white/10 px-6 py-6 text-center text-xs text-[#d0d0d0]">
        2025 JG Visual Estudio - Todos los derechos reservados
      </p>
    </footer>
  );
}
