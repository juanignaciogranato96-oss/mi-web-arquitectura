"use client";

import { useEffect, useState } from "react";

const PROCESO_PASOS = [
  {
    id: 1,
    title: "Brief y visión compartida",
    description:
      "Relevamos documentación, objetivos comerciales y atmósfera deseada junto al cliente.",
  },
  {
    id: 2,
    title: "Alcance y lineamientos visuales",
    description:
      "Definimos entregables, plazos y moodboard de referencias para alinear expectativas.",
  },
  {
    id: 3,
    title: "Seteo de escena y materiales",
    description:
      "Configuramos cámaras, iluminación y materiales acordes a la identidad del proyecto.",
  },
  {
    id: 4,
    title: "Primeros renders y feedback guiado",
    description:
      "Publicamos avances en carpeta privada y guiamos la revisión con observaciones precisas.",
  },
  {
    id: 5,
    title: "Iteraciones finales y postproducción",
    description:
      "Aplicamos ajustes, afinamos detalles y trabajamos la postproducción fotográfica.",
  },
  {
    id: 6,
    title: "Entrega final y acompañamiento",
    description:
      "Subimos el material final y seguimos disponibles para activaciones o ajustes posteriores.",
  },
] as const;

export default function ProcesoTrabajo() {
  const [activeStep, setActiveStep] = useState<number>(PROCESO_PASOS[0].id);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveStep((prev) => {
        const currentIndex = PROCESO_PASOS.findIndex((step) => step.id === prev);
        const nextIndex = (currentIndex + 1) % PROCESO_PASOS.length;
        return PROCESO_PASOS[nextIndex].id;
      });
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const activeData =
    PROCESO_PASOS.find((item) => item.id === activeStep) ?? PROCESO_PASOS[0];

  return (
    <section className="bg-neutral-50 py-20">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-3xl font-bold text-neutral-900">Proceso de trabajo</h2>
        <p className="mt-2 text-neutral-600">
          Conocé cómo articulamos cada etapa junto a tu equipo.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {PROCESO_PASOS.map((step) => {
            const isActive = step.id === activeStep;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0C2D57]/70 ${
                  isActive
                    ? "scale-110 bg-[#0C2D57] shadow-lg shadow-[#0C2D57]/30 ring-4 ring-[#0C2D57]/40"
                    : "bg-[#0C2D57]/70 hover:bg-[#0C2D57]"
                }`}
                aria-pressed={isActive}
              >
                {step.id}
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-neutral-200 bg-white p-8 text-left shadow-sm transition-all duration-300">
          <h3 className="text-lg font-semibold text-neutral-900">
            {activeData.title}
          </h3>
          <p className="mt-3 text-neutral-600">{activeData.description}</p>
        </div>
      </div>
    </section>
  );
}
