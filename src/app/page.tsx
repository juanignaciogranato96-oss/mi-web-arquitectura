"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, Sparkles } from "lucide-react";
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
import { proyectos } from "@/data/proyectos";
import type { Proyecto } from "@/data/proyectos";
import type { LocaleKey } from "@/locales";
import { getCopy } from "@/locales";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/i18n";

type ProjectCategory = "commercial" | "residential";

const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  commercial: "#F7D46C",
  residential: "#CFE4C8",
};

const DEFAULT_PROJECT_FALLBACK = "/images/estudio/casa-hormigon-portada.avif";

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

const ProcesoTrabajo = dynamic(() => import("@/components/ProcesoTrabajo"), {
  loading: () => (
    <section className="bg-neutral-50 py-12 sm:py-16 md:py-20">
      <div className="mx-auto w-full max-w-screen-lg px-4 sm:px-6 md:px-8">
        <div className="h-24 animate-pulse rounded-3xl bg-white/60" />
      </div>
    </section>
  ),
});

const Testimonios = dynamic(() => import("@/components/Testimonios"), {
  ssr: false,
  loading: () => (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 md:px-8">
        <div className="h-40 animate-pulse rounded-3xl bg-neutral-100" />
      </div>
    </section>
  ),
});

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
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-2xl hover:shadow-neutral-900/15"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        whileHover={{ y: -12 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-72 lg:h-80">
          <Image
            src={src}
            alt={name}
            fill
            sizes="(min-width: 1280px) calc((min(1280px, 100vw) - 64px) / 3), (min-width: 1024px) calc((min(1200px, 100vw) - 48px) / 3), (min-width: 768px) calc((100vw - 48px) / 2), calc(100vw - 32px)"
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
  const { scroll } = useSmoothScroll();
  const [language, setLanguage] = useState<LocaleKey>(DEFAULT_LOCALE);
  const copy = getCopy(language);
  const [approachSlideIndex, setApproachSlideIndex] = useState(0);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const storedLanguage = window.localStorage.getItem("jg-visual-lang");
    if (storedLanguage && isSupportedLocale(storedLanguage)) {
      setLanguage(storedLanguage);
    }
  }, [setLanguage]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setIsLoaderVisible(false);
      return;
    }
    const timeout = window.setTimeout(() => setIsLoaderVisible(false), 1300);
    return () => window.clearTimeout(timeout);
  }, []);

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
  const approachHighlights = useMemo(
    () => copy.approach.highlights ?? [],
    [copy.approach.highlights],
  );
  const approachSlides = useMemo(
    () => {
      const baseSlides = [
        {
          src: "/images/team/1.avif",
          className: "filter grayscale",
          priority: true,
        },
        {
          src: "/images/team/2.avif",
          className: "filter grayscale",
          priority: false,
        },
        {
          src: "/images/team/3.avif",
          className: "filter grayscale",
          priority: false,
        },
        {
          src: "/images/team/4.avif",
          className: "filter grayscale",
          priority: false,
        },
        {
          src: "/images/team/5.avif",
          className: "filter grayscale",
          priority: false,
        },
        {
          src: "/images/team/6.avif",
          className: "filter grayscale",
          priority: false,
        },
        {
          src: "/images/team/7.avif",
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
    const target = document.querySelector<HTMLElement>("#projects");
    if (!target) {
      return;
    }
    if (scroll) {
      scroll.scrollTo(target, { offset: -120, duration: 800 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [scroll]);

  useEffect(() => {
    setApproachSlideIndex(0);
  }, [language]);

  return (
    <>
      <AnimatePresence>
        {isLoaderVisible ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] sm:text-sm"
            >
              <span className="inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-[#C2A85F]" />
              JG Visual Estudio
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <Header
        labels={copy.header}
        language={language}
        onLanguageChange={setLanguage}
        onProjectsClick={handleProjectsClick}
        whatsappUrl={WHATSAPP_URL}
      />

      {/* FIX: Sustituir main anidado por contenedor div para mantener una sola region principal. */}
      <div className="bg-white pt-20 text-neutral-900 sm:pt-24">
        <Hero
          badge={copy.hero.badge}
          title={copy.hero.title}
          subtitle={copy.hero.subtitle}
          buttons={copy.hero.buttons}
          onProjectsClick={handleProjectsClick}
          whatsappUrl={WHATSAPP_URL}
        />

        <motion.section
          data-scroll-section
          className="mx-auto w-full max-w-screen-xl px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase text-[#C2A85F] sm:text-sm">
              <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
              <span className="tracking-[0.35em]">{copy.services.title}</span>
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
          data-scroll-section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ProcesoTrabajo />
        </motion.section>

        <motion.section
          id="projects"
          data-scroll-section
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
          data-scroll-section
          className="bg-[#f7f7f7] py-12 sm:py-16 md:py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mx-auto grid w-full max-w-screen-xl items-center gap-12 px-4 sm:px-6 sm:gap-14 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <motion.div
              className="w-full"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#1b4332] sm:text-sm">
                {copy.approach.title}
              </p>
              <h2 className="mt-4 text-2xl font-semibold sm:text-4xl md:text-5xl">
                {copy.approach.heading}
              </h2>
              <div className="mt-6 rounded-3xl border border-neutral-300/60 bg-white/90 p-5 shadow-sm shadow-neutral-900/5 sm:p-8">
                <motion.p
                  key={currentApproachMessage}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-sm font-light italic text-neutral-600 sm:text-base"
                >
                  &ldquo;{currentApproachMessage}&rdquo;
                </motion.p>
                <div className="mt-5 text-sm text-neutral-500 sm:text-base">
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
              <div className="w-full max-w-sm sm:max-w-lg lg:max-w-xl">
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
                  {approachSlides.map((slide, index) => (
                    <SwiperSlide key={slide.src}>
                      <div className="relative aspect-[5/6] w-full overflow-hidden rounded-2xl sm:aspect-[4/5]">
                        <Image
                          src={slide.src}
                          alt={`Juan Granato - ${slide.message || copy.approach.title}`}
                          fill
                          sizes="(min-width: 1280px) calc((min(1280px, 100vw) - 64px) / 2.2), (min-width: 1024px) calc((min(1200px, 100vw) - 48px) / 2.2), (min-width: 768px) calc((100vw - 48px) / 1.6), calc(100vw - 32px)"
                          className={`h-full w-full rounded-2xl object-cover ${slide.className ?? ""}`}
                          priority={index === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div data-scroll-section>
          <Testimonios />
        </div>

        <motion.section
          data-scroll-section
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
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0a0a0a] shadow-lg shadow-black/25 transition hover:-translate-y-1 hover:bg-neutral-200 sm:w-auto sm:px-6 sm:py-3"
              >
                <span>{copy.cta.button}</span>
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
      <div data-scroll-section>
        <Footer labels={copy.footer} />
      </div>
    </>
  );
}







