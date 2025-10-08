"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CubeTransparentIcon,
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { Header, type LanguageCode } from "@/components/Header";

const SERVICES_ICONS = [
  CubeTransparentIcon,
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
] as const;

type ProjectCategory = "commercial" | "residential";

type ProjectItem = {
  image: string;
  category: ProjectCategory;
  labels: Record<LanguageCode, { name: string }>;
};

const PROJECTS: ProjectItem[] = [
  {
    image: "/images/proyectos/proyecto-3.webp",
    category: "commercial",
    labels: {
      es: { name: "Cafe Chilin" },
      en: { name: "Chilin Cafe" },
    },
  },
  {
    image: "/images/proyectos/proyecto-1.webp",
    category: "residential",
    labels: {
      es: { name: "Casa Hormigon" },
      en: { name: "Concrete House" },
    },
  },
  {
    image: "/images/proyectos/proyecto-2.webp",
    category: "residential",
    labels: {
      es: { name: "Cocina Casa Teros" },
      en: { name: "Teros House Kitchen" },
    },
  },
  {
    image: "/images/proyectos/proyecto-4.webp",
    category: "residential",
    labels: {
      es: { name: "Departamento Nexus" },
      en: { name: "Nexus Apartment" },
    },
  },
  {
    image: "/images/proyectos/proyecto-5.webp",
    category: "residential",
    labels: {
      es: { name: "Casa Kai" },
      en: { name: "Kai House" },
    },
  },
  {
    image: "/images/proyectos/proyecto-6.webp",
    category: "commercial",
    labels: {
      es: { name: "Local Glam" },
      en: { name: "Glam Retail" },
    },
  },
];

const CATEGORY_BADGES: Record<
  ProjectCategory,
  { color: string; labels: Record<LanguageCode, string> }
> = {
  commercial: {
    color: "#EAC64D",
    labels: { es: "Comercial", en: "Commercial" },
  },
  residential: {
    color: "#9DBA8F",
    labels: { es: "Residencial", en: "Residential" },
  },
};

const COPY: Record<
  LanguageCode,
  {
    hero: { title: string; subtitle: string };
    services: { title: string; subtitle: string; items: string[]; descriptions: string[] };
    projects: { title: string; subtitle: string; overlay: string };
    approach: { title: string; heading: string; quote: string; author: string; role: string };
    testimonials: { title: string; subtitle: string };
    testimonialsContent: Array<{ quote: string; author: string; role: string }>;
    cta: { title: string; button: string };
  }
> = {
  es: {
    hero: {
      title: "Disenamos y visualizamos arquitectura que se vive.",
      subtitle: "Renders, diseno y regularizacion de obra en Rosario y Funes.",
    },
    services: {
      title: "Servicios",
      subtitle:
        "Acompanamos cada etapa del proyecto con visualizaciones hiperrealistas, diseno integral y gestion documental.",
      items: [
        "Render 3D hiperrealista",
        "Diseno arquitectonico integral",
        "Regularizacion de obra",
      ],
      descriptions: [
        "Imagenes que comunican ideas antes de construir y potencian ventas.",
        "Concepto, desarrollo y detalle constructivo alineado a objetivos del cliente.",
        "Gestion tecnica y documental en Rosario y Funes con seguimiento cercano.",
      ],
    },
    projects: {
      title: "Ultimos proyectos",
      subtitle:
        "Visuales que destacan la esencia material, la luz y el habitar de cada espacio.",
      overlay: "Ver proyecto",
    },
    approach: {
      title: "Nuestro enfoque",
      heading:
        "Transformamos ideas en imagenes que inspiran, anticipan y venden proyectos antes de construirse.",
      quote:
        "Cada render es una herramienta estrategica que alinea vision, inversion y aprobaciones clave.",
      author: "Arq. Juan Granato",
      role: "Director de JG Visual Estudio",
    },
    testimonials: {
      title: "Testimonios",
      subtitle: "Estudios, desarrolladoras y constructoras confian en nuestro proceso.",
    },
    testimonialsContent: [
      {
        quote:
          "El nivel de detalle en los renders nos permite resolver decisiones antes de obra y elevar las presentaciones con inversores.",
        author: "Arq. Sofia Mendez",
        role: "Estudio Habitat",
      },
      {
        quote:
          "La metodologia colaborativa asegura consistencia desde el concepto hasta la documentacion final.",
        author: "Ing. Nicolas Raffo",
        role: "Constructora RFX",
      },
      {
        quote:
          "Cumple plazos exigentes sin resignar precision y es nuestro aliado para regularizaciones en Rosario y Funes.",
        author: "Dra. Valentina Cano",
        role: "Desarrolladora inmobiliaria",
      },
    ],
    cta: {
      title: "Listo para mostrar tu proyecto como nunca antes?",
      button: "Solicitar presupuesto",
    },
  },
  en: {
    hero: {
      title: "We design and visualize architecture you can feel.",
      subtitle: "Renderings, design and permitting services for Rosario and Funes.",
    },
    services: {
      title: "Services",
      subtitle:
        "We support every project phase with hyper-realistic visuals, integrated design and permitting expertise.",
      items: [
        "Hyper-realistic 3D render",
        "Integrated architectural design",
        "Building regularization",
      ],
      descriptions: [
        "Imagery that communicates intent before construction and accelerates sales.",
        "Concept, development and technical detailing aligned with client goals.",
        "Technical documentation and municipal management across Rosario and Funes.",
      ],
    },
    projects: {
      title: "Latest projects",
      subtitle:
        "Visual stories that highlight materiality, light and the way each space is lived.",
      overlay: "View project",
    },
    approach: {
      title: "Our approach",
      heading:
        "We turn ideas into images that inspire, anticipate and sell projects before they are built.",
      quote:
        "Every render is a strategic tool that aligns vision, investment and key approvals.",
      author: "Arch. Juan Granato",
      role: "Director at JG Visual Studio",
    },
    testimonials: {
      title: "Testimonials",
      subtitle: "Studios, developers and builders rely on our process.",
    },
    testimonialsContent: [
      {
        quote:
          "The level of detail in each render lets us settle decisions ahead of construction and elevates investor presentations.",
        author: "Arch. Sofia Mendez",
        role: "Habitat Studio",
      },
      {
        quote:
          "The collaborative workflow keeps consistency from concept through final documentation.",
        author: "Eng. Nicolas Raffo",
        role: "RFX Construction",
      },
      {
        quote:
          "Deadlines are met without losing precision and they are our partner for permitting in Rosario and Funes.",
        author: "Dr. Valentina Cano",
        role: "Real estate developer",
      },
    ],
    cta: {
      title: "Ready to showcase your project like never before?",
      button: "Request a quote",
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HomePage() {
  const [language, setLanguage] = useState<LanguageCode>("es");
  const copy = COPY[language];

  const handleProjectsClick = useCallback(() => {
    const target = document.getElementById("projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const overlayLabel = copy.projects.overlay;

  const services = useMemo(
    () =>
      copy.services.items.map((title, index) => ({
        title,
        description: copy.services.descriptions[index],
        Icon: SERVICES_ICONS[index],
      })),
    [copy.services.descriptions, copy.services.items],
  );

  const testimonials = copy.testimonialsContent;

  return (
    <>
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onProjectsClick={handleProjectsClick}
      />

      <main className="bg-white text-neutral-900">
        <section className="relative min-h-[85vh] overflow-hidden pt-32 pb-16">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/proyectos/proyecto-5.webp"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/images/estudio/hero-video.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}
          />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {copy.hero.title}
              </h1>
              <p className="text-lg text-white/80 sm:text-xl">{copy.hero.subtitle}</p>
            </motion.div>
          </div>
        </section>

        <motion.section
          className="mx-auto max-w-6xl px-6 py-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C2A85F]">
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
            {services.map(({ title, description, Icon }) => (
              <motion.article
                key={title}
                variants={sectionVariants}
                className="group h-full rounded-3xl border border-neutral-200/70 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-900/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3B806B] text-white shadow-lg shadow-[#3B806B]/30">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-neutral-900">{title}</h3>
                <p className="mt-3 text-sm text-neutral-600">{description}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="projects"
          className="bg-[#f5f5f5] py-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#3B806B]">
                {copy.projects.title}
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                {copy.projects.subtitle}
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project, index) => {
                const badge = CATEGORY_BADGES[project.category];
                const name = project.labels[language].name;
                const badgeLabel = badge.labels[language];
                return (
                  <motion.figure
                    key={`${project.image}-${name}`}
                    className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-900/15"
                    variants={sectionVariants}
                  >
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={name}
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition group-hover:opacity-100">
                        <span className="rounded-full border border-white/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                          {overlayLabel}
                        </span>
                      </div>
                    </div>
                    <figcaption className="flex items-center justify-between px-5 py-4">
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{name}</p>
                      </div>
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
                        style={{ backgroundColor: badge.color, color: "#1b1b1b" }}
                      >
                        {badgeLabel}
                      </span>
                    </figcaption>
                  </motion.figure>
                );
              })}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="bg-[#f7f7f7]"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-8 px-6 py-12 lg:flex-row">
            <motion.div
              className="w-full flex-1"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#3B806B]">
                {copy.approach.title}
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                {copy.approach.heading}
              </h2>
              <div className="mt-6 rounded-3xl border border-neutral-300/50 bg-white/80 p-6 shadow-sm shadow-neutral-900/5 backdrop-blur">
                <p className="text-base italic text-neutral-600">
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
                src="/images/proyectos/proyecto-5.webp"
                alt="Render interior con luz tenue"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="mx-auto max-w-6xl px-6 py-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C2A85F]">
            {copy.testimonials.title}
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">
            {copy.testimonials.subtitle}
          </h2>
          <motion.div
            className="mt-8 grid gap-4 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {testimonials.map((item) => (
              <motion.article
                key={item.author}
                variants={sectionVariants}
                className="rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-sm shadow-neutral-900/5 backdrop-blur transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-900/15"
              >
                <p className="text-sm italic text-neutral-600">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-6 text-sm text-neutral-500">
                  <p className="font-semibold text-neutral-900">{item.author}</p>
                  <p>{item.role}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="relative overflow-hidden bg-[#111] py-12"
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
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#111] shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:bg-neutral-200"
              >
                {copy.cta.button}
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </>
  );
}
