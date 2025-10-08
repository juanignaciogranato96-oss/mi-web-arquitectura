import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/empresa", label: "Empresa" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="JG Visual Estudio">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-neutral-200 bg-white">
            <Image
              src="/images/logos/logo-jg.webp"
              alt="Logo JG Visual Estudio"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </div>
          <span className="text-sm font-semibold tracking-wide text-neutral-900 sm:text-base">
            JG Visual Estudio
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.24em] text-neutral-500 sm:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-neutral-900">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
