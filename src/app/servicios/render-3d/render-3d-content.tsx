"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const fadeInVariants = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const galleryContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const galleryItem = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const galleryItems = [
  {
    src: "/images/proyectos/CAFE-CHILIN (1).avif",
    alt: "Render interior de cafeteria con luz natural",
    caption: "Experiencias comerciales inmersivas",
  },
  {
    src: "/images/proyectos/CASA-HA (2).avif",
    alt: "Render residencial con materiales calidos",
    caption: "Residencias con narrativa luminosa",
  },
  {
    src: "/images/proyectos/GLAM (2).avif",
    alt: "Render de local comercial con diseno contemporaneo",
    caption: "Retail y branding espacial",
  },
  {
    src: "/images/proyectos/KAI (3).avif",
    alt: "Render arquitectonico con foco en exterior",
    caption: "Exteriorismo realista y atmosferas",
  },
] as const;

export function Render3DContent() {
  return (
    <div className="flex-1 bg-white">
      <motion.section
        data-scroll-section
        className="mx-auto max-w-4xl px-6 py-20 text-neutral-900 md:px-0 lg:py-24"
        variants={fadeInVariants}
        initial="initial"
        animate="animate"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1b4332] transition hover:text-[#2d6a4f]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          <span>Volver al inicio</span>
        </Link>

        <h1 className="mt-8 text-4xl font-bold sm:text-5xl">
          Render 3D y recorridos interactivos
        </h1>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-neutral-700 sm:text-lg">
          <p>
            Desarrollamos visualizaciones 3D que permiten explorar el proyecto antes de construirlo.
          </p>
          <p>
            Creamos imagenes que resaltan la luz, la escala y los materiales para comunicar ideas y acelerar decisiones de diseno o venta.
          </p>
          <p>
            Tambien producimos recorridos virtuales y piezas animadas utiles para presentaciones, redes o exhibiciones comerciales.
          </p>
          <p>
            Adaptamos cada entrega a proyectos residenciales y comerciales, afinando ambientacion y narrativa segun el publico objetivo.
          </p>
        </div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {galleryItems.map((item, index) => (
            <motion.figure
              key={item.src}
              className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-neutral-900/10"
              variants={galleryItem}
              whileHover={{ y: -8 }}
            >
              <motion.div
                className="relative aspect-[4/3] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-90" />
              </motion.div>
              <figcaption className="flex items-center justify-between px-5 py-4 text-sm font-medium text-neutral-700">
                <span>{item.caption}</span>
                <span className="text-xs uppercase tracking-[0.3em] text-[#1b4332]">
                  Render
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <Link
          href="/presupuesto"
          className="group mt-12 inline-flex items-center justify-center gap-2 rounded-full bg-[#1b4332] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1b4332]/25 transition hover:-translate-y-1 hover:bg-[#2d6a4f] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1b4332]/60"
        >
          <span>Solicitar presupuesto</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </motion.section>
    </div>
  );
}
