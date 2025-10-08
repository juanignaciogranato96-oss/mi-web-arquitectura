import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/empresa", label: "Empresa" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold text-neutral-900"
          aria-label="J.G. Diseño y Visualización Arquitectónica"
        >
          J.G. Diseño y Visualización Arquitectónica
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-neutral-600">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-neutral-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
