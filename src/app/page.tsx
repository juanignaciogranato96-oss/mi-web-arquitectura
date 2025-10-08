"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CubeTransparentIcon,
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

type Language = "es" | "en";

const LANGUAGES: Language[] = ["es", "en"];

const PROJECTS = [
  {
    image: "/images/proyectos/proyecto-1.webp",
    name: {
      es: "Casa Horizonte",
      en: "Horizonte Residence",
    },
    category: {
      es: "Residencial",
      en: "Residential",
    },
  },
  {
    image: "/images/proyectos/proyecto-2.webp",
    name: {
      es: "Faro Urbano",
      en: "Urban Lighthouse",
    },
    category: {
      es: "Multifamiliar",
      en: "Multi-family",
    },
  },
  {
    image: "/images/proyectos/proyecto-3.webp",
    name: {
      es: "Café Chilin",
      en: "Chilin Café",
    },
    category: {
      es: "Comercial",
      en: "Commercial",
    },
  },
  {
    image: "/images/proyectos/proyecto-4.webp",
    name: {
      es: "Oficinas Nexus",
      en: "Nexus Offices",
    },
    category: {
      es: "Corporativo",
      en: "Corporate",
    },
  },
  {
    image: "/images/proyectos/proyecto-5.webp",
    name: {
      es: "Casa Kai",
      en: "Kai House",
    },
    category: {
      es: "Residencial",
      en: "Residential",
    },
  },
  {
    image: "/images/proyectos/proyecto-6.webp",
    name: {
      es: "Galería Delta",
      en: "Delta Gallery",
    },
    category: {
      es: "Cultural",
      en: "Cultural",
    },
  },
];

const TESTIMONIALS = [
  {
    quote: {
      es: "“El nivel de detalle en los renders de Juan adelanta decisiones clave y eleva cada presentación con nuestros inversores.”",
      en: "“Juan’s renderings anticipate key decisions and elevate every presentation we make to investors.”",
    },
    author: "Arq. Sofía Méndez",
    role: {
      es: "Directora en Estudio Habitat",
      en: "Director at Estudio Habitat",
    },
  },
  {
    quote: {
      es: "“Su proceso colaborativo nos permitió validar el diseño integral antes de licitar la obra.”",
      en: "“His collaborative process let us validate the entire design before tendering the project.”",
    },
    author: "Ing. Nicolás Raffo",
    role: {
      es: "Gerente de Proyectos, Constructora RFX",
      en: "Project Manager, RFX Construction",
    },
  },
  {
    quote: {
      es: "“Cumple plazos exigentes sin resignar precisión. Es nuestro aliado para regularizaciones en Rosario y Funes.”",
      en: "“He meets demanding timelines without sacrificing precision. He’s our partner for permitting across Rosario and Funes.”",
    },
    author: "Dra. Valentina Cano",
    role: {
      es: "Desarrolladora Inmobiliaria",
      en: "Real Estate Developer",
    },
  },
];

const COPY: Record<Language, {
  hero: {
    title: string;
    subtitle: string;
    badge: string;
    buttons: {
      projects: string;
      quote: string;
      whatsapp: string;
    };
  };
  services: {
    title: string;
    description: string;
    items: Array<{ title: string; description: string }>;
  };
  projects: {
    title: string;
    description: string;
  };
  approach: {
    title: string;
    heading: string;
    quote: string;
    signature: string;
    role: string;
    imageAlt: string;
  };
  testimonials: {
    title: string;
  };
  cta: {
    title: string;
    button: string;
  };
  languageLabel: string;
}> = {
  es: {
    hero: {
      title: "Diseñamos y visualizamos arquitectura que se vive.",
      subtitle: "Renders, diseño y regularización de obra en Rosario y Funes.",
      badge: "JG Visual Estudio · Dirigido por el Arq. Juan Granato",
      buttons: {
        projects: "Ver proyectos",
        quote: "Solicitar presupuesto",
        whatsapp: "Consultar por WhatsApp",
      },
    },
    services: {
      title: "Servicios",
      description:
        "Combinamos visión arquitectónica, tecnología y documentación precisa para potenciar cada etapa del proyecto.",
      items: [
        {
          title: "Render 3D hiperrealista",
          description: "Imágenes que comunican ideas antes de construir.",
        },
        {
          title: "Diseño arquitectónico integral",
          description: "Desde el concepto hasta el detalle constructivo.",
        },
        {
          title: "Regularización de obra",
          description: "Gestión técnica y documental en Rosario y Funes.",
        },
      ],
    },
    projects: {
      title: "Últimos proyectos",
      description:
        "Visuales que elevan presentaciones comerciales, concursos y aprobaciones municipales.",
    },
    approach: {
      title: "Nuestro enfoque",
      heading:
        "Transformamos ideas en imágenes que inspiran, anticipan y venden proyectos antes de construirse.",
      quote:
        "La visualización arquitectónica es una herramienta estratégica: muestra la esencia del proyecto y acelera decisiones clave.",
      signature: "Arq. Juan Granato",
      role: "Director de JG Visual Estudio",
      imageAlt: "Render interior del proyecto Casa Kai",
    },
    testimonials: {
      title: "Testimonios",
    },
    cta: {
      title: "¿Listo para mostrar tu proyecto como nunca antes?",
      button: "Solicitar presupuesto",
    },
    languageLabel: "Idioma",
  },
  en: {
    hero: {
      title: "We design and visualize architecture you can feel.",
      subtitle: "Renderings, design and permitting for Rosario and Funes.",
      badge: "JG Visual Studio · Led by Arch. Juan Granato",
      buttons: {
        projects: "View projects",
        quote: "Request a quote",
        whatsapp: "Chat on WhatsApp",
      },
    },
    services: {
      title: "Services",
      description:
        "We blend architectural vision, technology and precise documentation to empower every project phase.",
      items: [
        {
          title: "Hyper-realistic 3D render",
          description: "Imagery that communicates ideas before construction.",
        },
        {
          title: "Integrated architectural design",
          description: "From concept development to construction details.",
        },
        {
          title: "Building regularization",
          description: "Technical and paperwork management in Rosario and Funes.",
        },
      ],
    },
    projects: {
      title: "Latest projects",
      description:
        "Visual assets that elevate sales presentations, competitions and municipal approvals.",
    },
    approach: {
      title: "Our approach",
      heading:
        "We turn ideas into images that inspire, anticipate and sell projects before they are built.",
      quote:
        "Architectural visualization is strategic: it conveys a project’s essence and accelerates informed decisions.",
      signature: "Arch. Juan Granato",
      role: "Director at JG Visual Studio",
      imageAlt: "Interior visual of Kai House project",
    },
    testimonials: {
      title: "Testimonials",
    },
    cta: {
      title: "Ready to showcase your project like never before?",
      button: "Request a quote",
    },
    languageLabel: "Language",
  },
};

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("es");
  const [isMounted, setIsMounted] = useState(false);
  const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([]);
  const testimonialRefs = useRef<Array<HTMLDivElement | null>>([]);

  const content = useMemo(() => COPY[language], [language]);

  const projects = useMemo(
    () =>
      PROJECTS.map((project) => ({
        ...project,
        translatedName: project.name[language],
        translatedCategory: project.category[language],
      })),
    [language],
  );

  const testimonials = useMemo(
    () =>
      TESTIMONIALS.map((item) => ({
        author: item.author,
        quote: item.quote[language],
        role: item.role[language],
      })),
    [language],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setVisibleTestimonials([]);
    testimonialRefs.current = testimonialRefs.current.slice(0, testimonials.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setVisibleTestimonials((prev) =>
              prev.includes(index) ? prev : [...prev, index],
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 },
    );

    testimonialRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, [testimonials]);

  const handleScrollToProjects = () => {
    const target = document.getElementById("projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const whatsappUrl = "https://wa.me/543415799316";

  return (
    <div className="bg-white text-neutral-900">
      <section className="relative min-h-[80vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="/images/proyectos/proyecto-1.webp"
        >
          <source src="/images/estudio/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/65" />

        <div className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-6 py-24">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
              <span className="hidden sm:inline">{content.languageLabel}</span>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`rounded-full px-2.5 py-1 transition ${
                    language === lang
                      ? "bg-white text-neutral-900"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`mt-12 max-w-3xl rounded-3xl bg-white/5 p-10 text-white shadow-2xl shadow-black/20 backdrop-blur-lg transition-all duration-700 ${
              isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              {content.hero.badge}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl">
              {content.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleScrollToProjects}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-neutral-100"
              >
                {content.hero.buttons.projects}
              </button>
              <Link
                href="/contacto"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                {content.hero.buttons.quote}
              </Link>
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-emerald-400/20 bg-emerald-500/20 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-500/30"
              >
                {content.hero.buttons.whatsapp}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="mx-auto max-w-6xl px-6 py-20 sm:py-24"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
            {content.services.title}
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            {content.services.description}
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.services.items.map((item, index) => {
            const Icon =
              index === 0
                ? CubeTransparentIcon
                : index === 1
                  ? BuildingOffice2Icon
                  : ClipboardDocumentCheckIcon;
            return (
              <article
                key={item.title}
                className="group h-full rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-900/5 transition-transform duration-300 ease-out hover:-translate-y-2 hover:border-neutral-300 hover:shadow-2xl hover:shadow-neutral-900/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white transition group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="projects"
        className="bg-neutral-50 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
              {content.projects.title}
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              {content.projects.description}
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <figure
                key={project.image}
                className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-900/10"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.translatedName}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {project.translatedName}
                    </p>
                    <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                      {project.translatedCategory}
                    </span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f7]">
        <div className="mx-auto flex flex-col-reverse items-center gap-10 px-6 py-20 sm:py-24 lg:max-w-6xl lg:flex-row">
          <div className="w-full flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
              {content.approach.title}
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              {content.approach.heading}
            </h2>
            <div className="mt-8 rounded-3xl border border-neutral-300/50 bg-white/70 p-6 shadow-sm shadow-neutral-900/5 backdrop-blur">
              <p className="text-base text-neutral-600 italic">
                “{content.approach.quote}”
              </p>
              <div className="mt-6 text-sm text-neutral-500">
                <p className="font-semibold text-neutral-900">
                  {content.approach.signature}
                </p>
                <p>{content.approach.role}</p>
              </div>
            </div>
          </div>
          <div className="relative h-[420px] w-full flex-1 overflow-hidden rounded-3xl border border-neutral-200 shadow-lg shadow-neutral-900/10">
            <Image
              src="/images/proyectos/proyecto-5.webp"
              alt={content.approach.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
          {content.testimonials.title}
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">
          {language === "es"
            ? "Estudios, desarrolladoras y constructoras confían en nuestro proceso."
            : "Studios, developers and builders rely on our process."}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const isVisible = visibleTestimonials.includes(index);
            return (
              <div
                key={testimonial.author}
                data-index={index}
                ref={(el) => {
                  testimonialRefs.current[index] = el;
                }}
                className={`rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-sm shadow-neutral-900/5 backdrop-blur transition duration-700 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <p className="text-sm italic text-neutral-600">{testimonial.quote}</p>
                <div className="mt-6 text-sm text-neutral-500">
                  <p className="font-semibold text-neutral-900">{testimonial.author}</p>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1b1b1b] py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center text-white">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            {content.cta.title}
          </h2>
          <div className="mt-8">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-neutral-100"
            >
              {content.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
