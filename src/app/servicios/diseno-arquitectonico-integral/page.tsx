import type { Metadata } from "next";
import { DisenoIntegralContent } from "./diseno-integral-content";

export const metadata: Metadata = {
  title: "Diseno arquitectonico integral | Servicios - J.G. Visual Estudio",
  description:
    "Proyectos arquitectonicos integrales con acompanamiento desde el concepto hasta la documentacion tecnica y coordinacion de obra.",
  alternates: {
    canonical: "/servicios/diseno-arquitectonico-integral",
  },
};

export default function DisenoArquitectonicoIntegralPage() {
  return <DisenoIntegralContent />;
}
