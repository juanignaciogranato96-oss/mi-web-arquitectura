import { notFound } from "next/navigation";
import Image from "next/image";
import { proyectos } from "@/data/proyectos";

type ProyectoPageProps = {
  params: {
    slug: string;
  };
};

export default function ProyectoPage({ params }: ProyectoPageProps) {
  const proyecto = proyectos.find((item) => item.slug === params.slug);

  if (!proyecto) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-bold text-neutral-900">{proyecto.nombre}</h1>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.35em] text-[#1b4332]">
        {proyecto.tipo}
      </p>
      <p className="mt-6 text-lg text-neutral-700">{proyecto.descripcion}</p>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {proyecto.imagenes.map((imagen, index) => (
          <div
            key={imagen}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100"
          >
            <Image
              src={imagen}
              alt={`${proyecto.nombre} render ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return proyectos.map((proyecto) => ({
    slug: proyecto.slug,
  }));
}
