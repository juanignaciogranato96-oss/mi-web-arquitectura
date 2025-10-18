import type { Metadata } from "next";
import { Render3DContent } from "./render-3d-content";

export const metadata: Metadata = {
  title: "Render 3D y recorridos interactivos | Servicios - J.G. Visual Estudio",
  description:
    "Visualizaciones 3D, recorridos virtuales y animaciones que comunican proyectos residenciales y comerciales con enfoque arquitectonico.",
  alternates: {
    canonical: "/servicios/render-3d",
  },
};

export default function Render3DPage() {
  return <Render3DContent />;
}
