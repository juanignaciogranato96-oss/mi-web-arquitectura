"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

type TestimoniosProps = {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
};

export function Testimonios({ title, subtitle, testimonials }: TestimoniosProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 text-neutral-600">{subtitle}</p>
      </div>
      <div className="mt-12 px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          loop
          pagination={{ clickable: true }}
          spaceBetween={32}
          slidesPerView={1}
          className="mx-auto max-w-3xl"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={`${testimonial.author}-${testimonial.role}`}>
              <div className="rounded-3xl border border-neutral-200 bg-white/90 px-8 py-10 text-center shadow-sm shadow-neutral-900/10">
                <p className="text-base font-light italic text-neutral-600">
                  “{testimonial.quote}”
                </p>
                <div className="mt-6 text-sm text-neutral-500">
                  <p className="font-semibold text-neutral-900">
                    {testimonial.author}
                  </p>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
