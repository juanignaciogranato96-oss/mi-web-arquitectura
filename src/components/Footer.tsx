import Link from "next/link";

type FooterLabels = {
  heading: string;
  location: string;
  phone: string;
  email: string;
  rights: string;
  instagram: string;
  behance: string;
};

type SocialKey = "instagram" | "behance";

type FooterProps = {
  labels: FooterLabels;
};

const SOCIALS: Array<{
  href: string;
  key: SocialKey;
  icon: JSX.Element;
}> = [
  {
    href: "https://instagram.com/jg_archviz",
    key: "instagram",
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
    key: "behance",
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
];

export function Footer({ labels }: FooterProps) {
  return (
    <footer className="bg-[#0a0a0a] text-[#f1f1f1]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-20 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2 text-sm">
          <p className="text-base font-semibold uppercase tracking-[0.2em] text-white">
            {labels.heading}
          </p>
          <p>{labels.location}</p>
          <p>{labels.phone}</p>
          <Link
            href={`mailto:${labels.email}`}
            className="transition-colors hover:text-[#C2A85F]"
          >
            {labels.email}
          </Link>
        </div>
        <div className="flex gap-4">
          {SOCIALS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:-translate-y-1 hover:border-[#C2A85F] hover:text-[#C2A85F]"
              aria-label={labels[item.key]}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
      <p className="border-t border-white/10 px-6 py-6 text-center text-xs text-[#d0d0d0]">
        {labels.rights}
      </p>
    </footer>
  );
}
