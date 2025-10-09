import Image from "next/image";
import { notFound } from "next/navigation";
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
    <section className="max-w-5xl px-4 py-20 md:px-0 lg:py-24 mx-auto">
      <h1 className="text-4xl font-bold text-neutral-900 mb-2">
        {proyecto.nombre}
      </h1>
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.35em] text-[#1b4332]">
        {proyecto.tipo}
      </p>
      <p className="mb-10 text-lg leading-relaxed text-neutral-700">
        {proyecto.descripcion}
      </p>

      <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
        Contexto y objetivo del proyecto
      </h2>
      <p className="mb-12 text-neutral-700 leading-relaxed">
        Este trabajo fue desarrollado en colaboración con el cliente, buscando
        resaltar la esencia material y la relación entre luz, textura y función.
        Cada render fue pensado para transmitir sensaciones espaciales,
        destacando la coherencia entre concepto arquitectónico y experiencia
        visual.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {proyecto.imagenes.map((imagen, index) => (
          <div
            key={imagen}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100"
          >
            <Image
              src={imagen}
              alt={`${proyecto.nombre} imagen ${index + 1}`}
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
