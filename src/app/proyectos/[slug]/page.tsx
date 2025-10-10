import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { proyectos } from "@/data/proyectos";
import ProjectGallery from "@/components/ProjectGallery";

type ProyectoPageProps = {
  params: {
    slug: string;
  };
};

const SUPPORTED_EXTENSIONS = new Set([".webp", ".png", ".jpg", ".jpeg"]);

type GlobFunction = <T = unknown>(
  pattern: string,
  options?: {
    eager?: boolean;
    import?: string;
  },
) => Record<string, T>;

function getImagesFromGlob(slug: string): string[] {
  const globFn = (import.meta as unknown as { glob?: GlobFunction }).glob;
  if (typeof globFn !== "function") {
    return [];
  }

  try {
    const modules = globFn(
      `/public/images/proyectos/${slug}-*.{webp,png,jpg,jpeg}`,
      {
        eager: true,
        import: "default",
      },
    ) as Record<string, string>;

    return Object.entries(modules)
      .map(([filePath, modulePath]) => {
        const normalized =
          typeof modulePath === "string"
            ? modulePath
            : filePath.replace(/^.*\/public/, "");
        return normalized.startsWith("/") ? normalized : `/${normalized}`;
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

async function getImagesFromFs(slug: string) {
  const directory = path.join(process.cwd(), "public", "images", "proyectos");

  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => {
        if (!fileName.startsWith(`${slug}-`)) {
          return false;
        }
        const extension = fileName
          .slice(fileName.lastIndexOf("."))
          .toLowerCase();
        return SUPPORTED_EXTENSIONS.has(extension);
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((fileName) => `/images/proyectos/${fileName}`);
  } catch {
    return [];
  }
}

async function getProjectImages(slug: string) {
  const globImages = getImagesFromGlob(slug);
  if (globImages.length > 0) {
    return globImages;
  }
  return getImagesFromFs(slug);
}

export default async function ProyectoPage({ params }: ProyectoPageProps) {
  const proyecto = proyectos.find((item) => item.slug === params.slug);

  if (!proyecto) {
    notFound();
  }

  const dynamicImages = await getProjectImages(proyecto.slug);
  const galleryImages =
    dynamicImages.length > 0 ? dynamicImages : proyecto.imagenes ?? [];
  const showPlaceholder = galleryImages.length === 0;

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 md:px-0 lg:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#1b4332] transition hover:text-[#2d6a4f]"
      >
        <span aria-hidden="true">←</span>
        Volver al inicio
      </Link>

      <h1 className="mt-6 text-4xl font-bold text-neutral-900">
        {proyecto.nombre}
      </h1>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.35em] text-[#1b4332]">
        {proyecto.tipo}
      </p>
      <p className="mt-8 text-lg leading-relaxed text-neutral-700">
        {proyecto.descripcion}
      </p>

      <h2 className="mt-12 text-2xl font-semibold text-neutral-900">
        Contexto y objetivo del proyecto
      </h2>
      <p className="mt-4 leading-relaxed text-neutral-700">
        Este trabajo se desarrolló junto al cliente para potenciar la intención
        arquitectónica, cuidando la lectura de materiales, la incidencia de la
        luz y la experiencia espacial en cada imagen generada.
      </p>

      {showPlaceholder ? (
        <p className="mt-12 rounded-xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500">
          Imágenes en preparación.
        </p>
      ) : (
        <div className="mt-12">
          <ProjectGallery images={galleryImages} projectName={proyecto.nombre} />
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#1b4332] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d6a4f]"
        >
          <span aria-hidden="true">←</span>
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return proyectos.map((proyecto) => ({
    slug: proyecto.slug,
  }));
}
