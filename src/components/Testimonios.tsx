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
      "Cumple plazos exigentes sin resignar precisión y es nuestro aliado para regularizaciones en Rosario y Funes.",
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
];

export default function Testimonios() {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-center text-3xl font-semibold mb-10">
        Testimonios
      </h2>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={3}
        spaceBetween={30}
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-6xl mx-auto"
      >
        {testimonios.map((testimonio, index) => (
          <SwiperSlide key={`${testimonio.autor}-${index}`}>
            <div className="bg-neutral-50 p-6 rounded-lg shadow text-center h-full flex flex-col justify-between">
              <p className="italic text-neutral-600 mb-4">
                “{testimonio.texto}”
              </p>
              <div>
                <p className="font-semibold">{testimonio.autor}</p>
                <p className="text-sm text-neutral-500">{testimonio.cargo}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
