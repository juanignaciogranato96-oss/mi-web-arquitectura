"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  CubeTransparentIcon,
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";
import ProcesoTrabajo from "@/components/ProcesoTrabajo";
import Testimonios from "@/components/Testimonios";
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

const SERVICE_ROUTES = [
  "/servicios/render-3d",
  "/servicios/diseno-arquitectonico-integral",
  "/servicios/regularizacion-de-obra",
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
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1b4332]/60"
    >
      <motion.figure
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-900/15"
        variants={sectionVariants}
      >
        <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-72 lg:h-80">
          <Image
            src={src}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={isPriority}
            className="h-full w-full rounded-2xl object-cover transition duration-700 group-hover:scale-105"
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
        <figcaption className="flex items-center justify-between px-6 py-5">
          <p className="text-base font-semibold text-neutral-900 sm:text-lg">
            {name}
          </p>
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
  const [approachSlideIndex, setApproachSlideIndex] = useState(0);

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
        href: SERVICE_ROUTES[index] ?? "/servicios",
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
      const primaryImage = proyecto.portada ?? DEFAULT_PROJECT_FALLBACK;
      const fallbackImage =
        proyecto.imagenes[0] ?? DEFAULT_PROJECT_FALLBACK;

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
  const approachHighlights = copy.approach.highlights ?? [];
  const approachSlides = useMemo(
    () => {
      const baseSlides = [
        {
          src: "/images/team/1.webp",
          className: "filter grayscale",
          priority: true,
        },
        {
          src: "/images/team/2.webp",
          className: "filter grayscale",
          priority: false,
        },
        {
          src: "/images/team/3.webp",
          className: "filter grayscale",
          priority: false,
        },
        {
          src: "/images/team/4.webp",
          className: "filter grayscale",
          priority: false,
        },
        {
          src: "/images/team/5.webp",
          className: "filter grayscale",
          priority: false,
        },
        {
          src: "/images/team/6.webp",
          className: "filter grayscale",
          priority: false,
        },
        {
          src: "/images/team/7.webp",
          className: "filter grayscale",
          priority: false,
        },
      ];

      if (approachHighlights.length === 0) {
        return baseSlides.map((slide) => ({
          ...slide,
          message: "",
        }));
      }

      return baseSlides.map((slide, index) => ({
        ...slide,
        message:
          approachHighlights[index] ??
          approachHighlights[index % approachHighlights.length],
      }));
    },
    [approachHighlights],
  );
  const currentApproachSlide =
    approachSlides[approachSlideIndex % approachSlides.length] ??
    approachSlides[0];
  const currentApproachMessage =
    currentApproachSlide && currentApproachSlide.message
      ? currentApproachSlide.message
      : copy.approach.quote;

  const handleProjectsClick = useCallback(() => {
    const target = document.getElementById("projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    setApproachSlideIndex(0);
  }, [language]);

  return (
    <>
      <Header
        labels={copy.header}
        language={language}
        onLanguageChange={setLanguage}
        onProjectsClick={handleProjectsClick}
        whatsappUrl={WHATSAPP_URL}
      />

      <main className="bg-white pt-20 text-neutral-900 sm:pt-24">
        <Hero
          badge={copy.hero.badge}
          title={copy.hero.title}
          subtitle={copy.hero.subtitle}
          buttons={copy.hero.buttons}
          onProjectsClick={handleProjectsClick}
          whatsappUrl={WHATSAPP_URL}
        />

        <motion.section
          className="mx-auto w-full max-w-screen-xl px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#C2A85F] sm:text-sm">
              {copy.services.title}
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl md:text-5xl">
              {copy.services.subtitle}
            </h2>
          </div>
          <motion.div
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((service) => {
              const Icon = service.Icon ?? CubeTransparentIcon;
              return (
                <motion.div
                  key={service.title}
                  className="h-full"
                  variants={sectionVariants}
                >
                  <Link
                    href={service.href}
                    className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1b4332]/60"
                    aria-label={`Ver servicio ${service.title}`}
                  >
                    <article className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-neutral-900/10 sm:p-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1b4332] text-white shadow-lg shadow-[#1b4332]/30 sm:h-14 sm:w-14">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                      </div>
                      <h3 className="mt-6 text-xl font-semibold text-neutral-900 sm:text-2xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                        {service.description}
                      </p>
                    </article>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ProcesoTrabajo />
        </motion.section>

        <motion.section
          id="projects"
          className="bg-[#f5f5f5] py-12 sm:py-16 md:py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b4332] sm:text-sm">
                {copy.projects.title}
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl md:text-5xl">
                {copy.projects.subtitle}
              </h2>
            </div>
            <motion.div
              className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
          className="bg-[#f7f7f7] py-12 sm:py-16 md:py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mx-auto grid w-full max-w-screen-xl items-center gap-10 px-4 sm:px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              className="w-full"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b4332] sm:text-sm">
                {copy.approach.title}
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl md:text-5xl">
                {copy.approach.heading}
              </h2>
              <div className="mt-6 rounded-3xl border border-neutral-300/60 bg-white/85 p-6 shadow-sm shadow-neutral-900/5 sm:p-8">
                <motion.p
                  key={currentApproachMessage}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-base font-light italic text-neutral-600 sm:text-lg"
                >
                  &ldquo;{currentApproachMessage}&rdquo;
                </motion.p>
                <div className="mt-6 text-sm text-neutral-500 sm:text-base">
                  <p className="font-semibold text-neutral-900">
                    {copy.approach.author}
                  </p>
                  <p>{copy.approach.role}</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="flex w-full justify-center lg:justify-end"
              variants={sectionVariants}
            >
              <div className="w-full max-w-xl">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  slidesPerView={1}
                  loop
                  autoplay={{ delay: 8000, disableOnInteraction: false }}
                  onSlideChange={(swiperInstance) => {
                    const index =
                      typeof swiperInstance.realIndex === "number"
                        ? swiperInstance.realIndex
                        : swiperInstance.activeIndex ?? 0;
                    setApproachSlideIndex(index);
                  }}
                  pagination={{ clickable: true }}
                  className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg shadow-neutral-900/10"
                >
                  {approachSlides.map((slide) => (
                    <SwiperSlide key={slide.src}>
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                        <Image
                          src={slide.src}
                          alt={`Juan Granato - ${slide.message || copy.approach.title}`}
                          fill
                          sizes="(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 100vw"
                          className={`h-full w-full rounded-2xl object-cover ${slide.className ?? ""}`}
                          priority={slide.priority}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <Testimonios />

        <motion.section
          className="relative overflow-hidden bg-[#0a0a0a] py-12 sm:py-16 md:py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
          <div className="relative mx-auto w-full max-w-3xl px-4 text-center text-white sm:px-6 md:px-8">
            <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
              {copy.cta.title}
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/presupuesto"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0a0a0a] shadow-lg shadow-black/25 transition hover:-translate-y-1 hover:bg-neutral-200 sm:w-auto sm:px-6 sm:py-3"
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







