"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const fadeInVariants = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function DisenoIntegralContent() {
  return (
    <div className="flex-1 bg-white">
      <motion.section
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
          Volver al inicio
        </Link>

        <h1 className="mt-8 text-4xl font-bold sm:text-5xl">
          Diseno arquitectonico integral
        </h1>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-neutral-700 sm:text-lg">
          <p>
            Desarrollamos proyectos desde el concepto inicial hasta el detalle constructivo, contemplando cada aspecto funcional, tecnico y estetico.
          </p>
          <p>
            Acompanamos al cliente en todas las etapas: anteproyecto, documentacion tecnica y coordinacion de obra.
          </p>
          <p>
            Buscamos soluciones arquitectonicas que respondan a los objetivos del cliente, cuidando la coherencia entre diseno y ejecucion.
          </p>
        </div>

        <Link
          href="/presupuesto"
          className="mt-12 inline-flex items-center justify-center rounded-full bg-[#1b4332] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1b4332]/25 transition hover:-translate-y-1 hover:bg-[#2d6a4f] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1b4332]/60"
        >
          Solicitar presupuesto
        </Link>
      </motion.section>
    </div>
  );
}
