"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CubeTransparentIcon,
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Testimonios } from "@/components/Testimonios";
import { proyectos } from "@/data/proyectos";
import type { Proyecto } from "@/data/proyectos";
import type { LocaleKey } from "@/locales";
import { getCopy } from "@/locales";

type ProjectCategory = "commercial" | "residential";

const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  commercial: "#EAC64D",
  residential: "#9DBA8F",
};

const DEFAULT_PROJECT_FALLBACK = "/images/estudio/CASA-HA-DIA.webp";

const WHATSAPP_URL = "https://wa.me/543415799316";

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const SERVICE_ICONS = [
  CubeTransparentIcon,
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
] as const;

type CopyContent = ReturnType<typeof getCopy>;
type ProjectCopyItem = CopyContent["projects"]["items"][number];

type ProjectCardData = {
  slug: string;
  order: number;
  image: string;
  fallbackImage: string;
  name: string;
  categoryKey: ProjectCategory;
  categoryLabel: string;
};

type ProjectCardProps = {
  slug: string;
  image: string;
  name: string;
  categoryKey: ProjectCategory;
  categoryLabel: string;
  overlayLabel: string;
  isPriority?: boolean;
  fallbackImage?: string;
};

function ProjectCard({
  slug,
  image,
  name,
  categoryKey,
  categoryLabel,
  overlayLabel,
  isPriority,
  fallbackImage,
}: ProjectCardProps) {
  const [src, setSrc] = useState(image);
  const fallback =
    fallbackImage && fallbackImage !== image
      ? fallbackImage
      : DEFAULT_PROJECT_FALLBACK;
  const badgeColor = CATEGORY_COLORS[categoryKey] ?? "#EAC64D";

  return (
    <Link
      href={`/proyectos/${slug}`}
      aria-label={`${overlayLabel} ${name}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1b4332]/60"
    >
      <motion.figure
        className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-900/15"
        variants={sectionVariants}
      >
        <div className="relative h-60 overflow-hidden">
          <Image
            src={src}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={isPriority}
            className="object-cover transition duration-700 group-hover:scale-105"
            onError={() => {
              if (src !== fallback) {
                setSrc(fallback);
              }
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition group-hover:opacity-100">
            <span className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white">
              {overlayLabel}
            </span>
          </div>
        </div>
        <figcaption className="flex items-center justify-between px-5 py-4">
          <p className="text-sm font-semibold text-neutral-900">{name}</p>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ backgroundColor: badgeColor, color: "#0a0a0a" }}
          >
            {categoryLabel}
          </span>
        </figcaption>
      </motion.figure>
    </Link>
  );
}

export default function HomePage() {
  const [language, setLanguage] = useState<LocaleKey>("es");
  const copy = getCopy(language);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const storedLanguage = window.localStorage.getItem("jg-visual-lang");
    if (storedLanguage === "es" || storedLanguage === "en") {
      setLanguage(storedLanguage);
    }
  }, [setLanguage]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("jg-visual-lang", language);
    }
  }, [language]);

  const services = useMemo(
    () =>
      copy.services.items.map((service, index) => ({
        ...service,
        Icon: SERVICE_ICONS[index],
      })),
    [copy.services.items],
  );

  const projectCards = useMemo<ProjectCardData[]>(() => {
    const itemsBySlug = new Map<string, ProjectCopyItem>(
      copy.projects.items.map((item) => [item.slug, item] as const),
    );
    const categoryLabels = copy.projects
      .categories as Record<ProjectCategory, string>;

    return proyectos.map((proyecto: Proyecto, index: number) => {
      const translation = itemsBySlug.get(proyecto.slug);
      const categoryKey: ProjectCategory = proyecto.categoria;
      const primaryImage = proyecto.imagenes[0] ?? DEFAULT_PROJECT_FALLBACK;
      const fallbackImage =
        proyecto.imagenes[1] ?? proyecto.imagenes[0] ?? DEFAULT_PROJECT_FALLBACK;

      return {
        slug: proyecto.slug,
        order: index,
        image: primaryImage,
        fallbackImage,
        name: translation?.name ?? proyecto.nombre,
        categoryKey,
        categoryLabel: translation?.type ?? categoryLabels[categoryKey],
      };
    });
  }, [copy.projects.items, copy.projects.categories]);
  const testimonialItems = copy.testimonials.items;

  const handleProjectsClick = useCallback(() => {
    const target = document.getElementById("projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <Header
        labels={copy.header}
        language={language}
        onLanguageChange={setLanguage}
        onProjectsClick={handleProjectsClick}
        whatsappUrl={WHATSAPP_URL}
      />

      <main className="bg-white text-neutral-900">
        <section className="relative flex h-screen w-full items-center justify-center overflow-hidden text-center text-white">
          <video
            src="/videos/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero.webp"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <motion.div
            className="relative z-10 max-w-3xl px-6"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
              {copy.hero.badge}
            </h2>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {copy.hero.title}
            </h1>
            <p className="mt-4 text-lg text-neutral-200 sm:text-xl">
              {copy.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#proyectos"
                onClick={handleProjectsClick}
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200"
              >
                {copy.hero.buttons.projects}
              </a>
              <Link
                href="/presupuesto"
                className="rounded-full bg-neutral-800 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
              >
                {copy.hero.buttons.quote}
              </Link>
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#1b4332] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#2d6a4f]"
              >
                {copy.hero.buttons.whatsapp}
              </Link>
            </div>
          </motion.div>
        </section>

        <motion.section
          className="mx-auto max-w-6xl px-6 py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#C2A85F]">
              {copy.services.title}
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              {copy.services.subtitle}
            </h2>
          </div>
          <motion.div
            className="mt-8 grid gap-4 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((service) => {
              const Icon = service.Icon ?? CubeTransparentIcon;
              return (
                <motion.article
                  key={service.title}
                  variants={sectionVariants}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-900/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1b4332] text-white shadow-lg shadow-[#1b4332]/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-neutral-900">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-neutral-600">{service.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section
          id="projects"
          className="bg-[#f5f5f5] py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b4332]">
                {copy.projects.title}
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                {copy.projects.subtitle}
              </h2>
            </div>
            <motion.div
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {projectCards.map((project) => {
                return (
                  <ProjectCard
                    key={project.slug}
                    slug={project.slug}
                    image={project.image}
                    name={project.name}
                    categoryKey={project.categoryKey}
                    categoryLabel={project.categoryLabel}
                    overlayLabel={copy.projects.overlay}
                    isPriority={project.order === 0}
                    fallbackImage={project.fallbackImage}
                  />
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="bg-[#f7f7f7]"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-8 px-6 py-20 lg:flex-row">
            <motion.div
              className="w-full flex-1"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b4332]">
                {copy.approach.title}
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                {copy.approach.heading}
              </h2>
              <div className="mt-6 rounded-3xl border border-neutral-300/60 bg-white/85 p-6 shadow-sm shadow-neutral-900/5">
                <p className="text-base font-light italic text-neutral-600">
                  &ldquo;{copy.approach.quote}&rdquo;
                </p>
                <div className="mt-6 text-sm text-neutral-500">
                  <p className="font-semibold text-neutral-900">{copy.approach.author}</p>
                  <p>{copy.approach.role}</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="relative h-[360px] w-full flex-1 overflow-hidden rounded-3xl border border-neutral-200 shadow-lg shadow-neutral-900/10"
              variants={sectionVariants}
            >
              <Image
                src="/images/estudio/CASA-JJ-COCINA.webp"
                alt="Render interior cálido del estudio"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.section>

        <Testimonios
          title={copy.testimonials.title}
          subtitle={copy.testimonials.subtitle}
          testimonials={testimonialItems}
        />

        <motion.section
          className="relative overflow-hidden bg-[#0a0a0a] py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
          <div className="relative mx-auto max-w-3xl px-6 text-center text-white">
            <h2 className="text-3xl font-semibold sm:text-4xl">{copy.cta.title}</h2>
            <div className="mt-8">
              <Link
                href="/presupuesto"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0a0a0a] shadow-lg shadow-black/25 transition hover:-translate-y-1 hover:bg-neutral-200"
              >
                {copy.cta.button}
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer labels={copy.footer} />
    </>
  );
}







