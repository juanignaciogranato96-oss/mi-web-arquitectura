import type { Metadata } from "next";
import { RegularizacionContent } from "./regularizacion-content";

export const metadata: Metadata = {
  title: "Regularizacion de obra | Servicios - J.G. Visual Estudio",
  description:
    "Gestion tecnica, documentacion conforme a obra y tramites municipales para regularizar construcciones en Rosario y alrededores.",
  alternates: {
    canonical: "/servicios/regularizacion-de-obra",
  },
};

export default function RegularizacionDeObraPage() {
  return <RegularizacionContent />;
}
