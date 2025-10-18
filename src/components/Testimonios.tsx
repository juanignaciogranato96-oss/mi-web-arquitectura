"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonios = [
  {
    autor: "Arq. Sofia Mendez",
    cargo: "Estudio Habitat",
    texto:
      "El nivel de detalle en los renders de Juan permite resolver decisiones antes de obra y elevar la presentacion con inversores.",
  },
  {
    autor: "Ing. Nicolas Raffo",
    cargo: "Constructora RFX",
    texto:
      "Su metodologia colaborativa asegura consistencia desde el concepto hasta la documentacion final.",
  },
  {
    autor: "Dra. Valentina Cano",
    cargo: "Desarrolladora inmobiliaria",
    texto:
      "Cumple plazos exigentes sin resignar precision y es nuestro aliado para regularizaciones en Rosario.",
  },
  {
    autor: "Arq. Esteban Gutierrez",
    cargo: "Estudio Morf",
    texto:
      "Visualizaciones que inspiran confianza y emocion en los clientes.",
  },
  {
    autor: "Lic. Maria Paredes",
    cargo: "Desarrolladora Urbania",
    texto:
      "Las imagenes de Juan transmiten el alma del proyecto y generan impacto comercial inmediato.",
  },
  {
    autor: "Ing. Matias Bruni",
    cargo: "Constructora Bruni",
    texto:
      "Gran capacidad para comunicar la idea arquitectonica a clientes y organismos tecnicos.",
  },
  {
    autor: "Arq. Paula Torres",
    cargo: "Estudio Axis",
    texto:
      "Interpretacion precisa y estetica de cada concepto de diseno.",
  },
  {
    autor: "Ing. Leandro Rojas",
    cargo: "Obras del Litoral",
    texto:
      "Compromiso y profesionalismo en todas las entregas.",
  },
  {
    autor: "Arq. Federico Sanz",
    cargo: "Habitat Proyectos",
    texto:
      "Excelente representacion material y manejo de la luz.",
  },
  {
    autor: "Des. Laura Romero",
    cargo: "Inmobiliaria Norte",
    texto:
      "Los renders de JG logran vender los proyectos antes de construirlos.",
  },
  {
    autor: "Arq. Tomas Villalba",
    cargo: "DV Arquitectura",
    texto:
      "Excelente colaboracion tecnica y artistica.",
  },
  {
    autor: "Arq. Natalia Ponce",
    cargo: "Studio Ponce",
    texto:
      "Atencion al detalle y estetica impecable en cada entrega.",
  },
  {
    autor: "Ing. Santiago Ruiz",
    cargo: "Grupo SR",
    texto:
      "Entregas rapidas y comunicacion clara, siempre superando expectativas.",
  },
  {
    autor: "Lic. Agustina Benitez",
    cargo: "Desarrollos BZ",
    texto:
      "Su trabajo agrega valor tangible en la presentacion de proyectos comerciales.",
  },
  {
    autor: "Arq. Facundo Lopez",
    cargo: "Estudio LOF",
    texto:
      "Profesionalismo y sensibilidad arquitectonica destacable.",
  },
] as const;

export default function Testimonios() {
  const [shouldAutoplay, setShouldAutoplay] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = (event?: MediaQueryListEvent) => {
      setShouldAutoplay(!(event ? event.matches : mediaQuery.matches));
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 md:px-8">
        <h2 className="text-center text-3xl font-semibold text-neutral-900 sm:text-4xl md:text-5xl">
          Testimonios
        </h2>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={24}
          loop
          autoplay={
            shouldAutoplay ? { delay: 3500, disableOnInteraction: false } : false
          }
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-10 w-full"
          aria-label="Testimonios de clientes"
          role="region"
          aria-live="polite"
          aria-roledescription="Carrusel de testimonios"
        >
          {testimonios.map((testimonio, index) => (
            <SwiperSlide key={`${testimonio.autor}-${index}`}>
              <article className="flex h-full flex-col justify-between rounded-2xl border border-neutral-100 bg-neutral-50 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-8">
                <p className="mb-4 text-sm italic text-neutral-600 sm:text-base">
                  &ldquo;{testimonio.texto}&rdquo;
                </p>
                <footer className="space-y-1 text-sm text-neutral-500 sm:text-base">
                  <p className="text-base font-semibold text-neutral-900 sm:text-lg">
                    {testimonio.autor}
                  </p>
                  <p>{testimonio.cargo}</p>
                </footer>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
