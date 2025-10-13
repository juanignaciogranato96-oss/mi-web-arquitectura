"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonios = [
  {
    autor: "Arq. Sofía Méndez",
    cargo: "Estudio Hábitat",
    texto:
      "El nivel de detalle en los renders de Juan permite resolver decisiones antes de obra y elevar la presentación con inversores.",
  },
  {
    autor: "Ing. Nicolás Raffo",
    cargo: "Constructora RFX",
    texto:
      "Su metodología colaborativa asegura consistencia desde el concepto hasta la documentación final.",
  },
  {
    autor: "Dra. Valentina Cano",
    cargo: "Desarrolladora inmobiliaria",
    texto:
      "Cumple plazos exigentes sin resignar precisión y es nuestro aliado para regularizaciones en Rosario.",
  },
  {
    autor: "Arq. Esteban Gutiérrez",
    cargo: "Estudio Morf",
    texto:
      "Visualizaciones que inspiran confianza y emoción en los clientes.",
  },
  {
    autor: "Lic. María Paredes",
    cargo: "Desarrolladora Urbania",
    texto:
      "Las imágenes de Juan transmiten el alma del proyecto y generan impacto comercial inmediato.",
  },
  {
    autor: "Ing. Matías Bruni",
    cargo: "Constructora Bruni",
    texto:
      "Gran capacidad para comunicar la idea arquitectónica a clientes y organismos técnicos.",
  },
  {
    autor: "Arq. Paula Torres",
    cargo: "Estudio Axis",
    texto:
      "Interpretación precisa y estética de cada concepto de diseño.",
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
      "Excelente representación material y manejo de la luz.",
  },
  {
    autor: "Des. Laura Romero",
    cargo: "Inmobiliaria Norte",
    texto:
      "Los renders de JG logran vender los proyectos antes de construirlos.",
  },
  {
    autor: "Arq. Tomás Villalba",
    cargo: "DV Arquitectura",
    texto:
      "Excelente colaboración técnica y artística.",
  },
  {
    autor: "Arq. Natalia Ponce",
    cargo: "Studio Ponce",
    texto:
      "Atención al detalle y estética impecable en cada entrega.",
  },
  {
    autor: "Ing. Santiago Ruiz",
    cargo: "Grupo SR",
    texto:
      "Entregas rápidas y comunicación clara, siempre superando expectativas.",
  },
  {
    autor: "Lic. Agustina Benítez",
    cargo: "Desarrollos BZ",
    texto:
      "Su trabajo agrega valor tangible en la presentación de proyectos comerciales.",
  },
  {
    autor: "Arq. Facundo López",
    cargo: "Estudio LOF",
    texto:
      "Profesionalismo y sensibilidad arquitectónica destacable.",
  },
] as const;

export default function Testimonios() {
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
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-10 w-full"
        >
          {testimonios.map((testimonio, index) => (
            <SwiperSlide key={`${testimonio.autor}-${index}`}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-neutral-100 bg-neutral-50 p-6 text-center shadow-sm sm:p-8">
                <p className="mb-4 text-sm italic text-neutral-600 sm:text-base">
                  &ldquo;{testimonio.texto}&rdquo;
                </p>
                <div>
                  <p className="text-base font-semibold text-neutral-900 sm:text-lg">
                    {testimonio.autor}
                  </p>
                  <p className="text-sm text-neutral-500 sm:text-base">
                    {testimonio.cargo}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
