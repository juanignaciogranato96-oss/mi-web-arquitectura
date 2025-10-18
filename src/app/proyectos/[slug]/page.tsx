import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { proyectos } from "@/data/proyectos";
import ProjectGallery from "@/components/ProjectGallery";
import { getAbsoluteUrl } from "@/lib/site";

type ProyectoPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const SUPPORTED_EXTENSIONS = new Set([".avif", ".webp", ".png", ".jpg", ".jpeg"]);

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

// FIX: Generar metadatos por proyecto para SEO y compartir en redes.
export async function generateMetadata({
  params,
}: ProyectoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = proyectos.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Proyecto no disponible | J.G. Visual Estudio",
      description: "El proyecto solicitado no existe o fue archivado.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${project.nombre} | Portafolio - J.G. Visual Estudio`;
  const description =
    project.descripcion.slice(0, 155) || "Proyecto destacado del estudio.";
  const previewImage = project.portada ?? project.imagenes?.[0];
  const canonicalPath = `/proyectos/${project.slug}`;
  const absolutePreview =
    previewImage && previewImage.startsWith("http")
      ? previewImage
      : previewImage
        ? getAbsoluteUrl(previewImage)
        : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(canonicalPath),
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: getAbsoluteUrl(canonicalPath),
      siteName: "J.G. Visual Estudio",
      images: absolutePreview
        ? [
            {
              url: absolutePreview,
              alt: `${project.nombre} render`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: absolutePreview ? [absolutePreview] : undefined,
    },
  };
}

export default async function ProyectoPage({ params }: ProyectoPageProps) {
  const { slug } = await params;
  const project = proyectos.find((item) => item.slug === slug) ?? notFound();

  const dynamicImages = await getProjectImages(project.slug);
  const galleryImages =
    dynamicImages.length > 0 ? dynamicImages : project.imagenes ?? [];
  const showPlaceholder = galleryImages.length === 0;

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 md:px-0 lg:py-24">
      {/* FIX: Normalizar iconos y copy accesible para navegacion. */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#1b4332] transition hover:text-[#2d6a4f]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Volver al inicio
      </Link>

      <h1 className="mt-6 text-4xl font-bold text-neutral-900">
        {project.nombre}
      </h1>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.35em] text-[#1b4332]">
        {project.tipo}
      </p>
      <p className="mt-8 text-lg leading-relaxed text-neutral-700">
        {project.descripcion}
      </p>

      <h2 className="mt-12 text-2xl font-semibold text-neutral-900">
        Contexto y objetivo del proyecto
      </h2>
      <p className="mt-4 leading-relaxed text-neutral-700">
        Este trabajo se desarrollo junto al cliente para potenciar la intencion
        arquitectonica, cuidando la lectura de materiales, la incidencia de la
        luz y la experiencia espacial en cada imagen generada.
      </p>

      {showPlaceholder ? (
        <p className="mt-12 rounded-xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500">
          Imagenes en preparacion.
        </p>
      ) : (
        <div className="mt-12">
          <ProjectGallery images={galleryImages} projectName={project.nombre} />
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#1b4332] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d6a4f]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
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
