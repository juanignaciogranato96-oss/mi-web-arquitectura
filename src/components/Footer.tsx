import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 bg-white">
            <Image
              src="/images/logos/logo-jg.webp"
              alt="Logo JG Visual Estudio"
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="text-sm text-neutral-600">
            <p className="font-semibold text-neutral-900">JG Visual Estudio</p>
            <Link
              href="mailto:juanignaciogranato96@hotmail.com"
              className="hover:text-neutral-900"
            >
              juanignaciogranato96@hotmail.com
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-neutral-500">
          <Link href="https://instagram.com/jg_archviz" target="_blank" rel="noopener noreferrer" className="transition hover:text-neutral-900">
            Instagram
          </Link>
          <Link href="https://behance.net/juangranato2" target="_blank" rel="noopener noreferrer" className="transition hover:text-neutral-900">
            Behance
          </Link>
        </div>
      </div>
      <p className="border-t border-neutral-200/70 py-6 text-center text-xs text-neutral-500">
        © 2025 JG Visual Estudio — Funes • Rosario.
      </p>
    </footer>
  );
}
