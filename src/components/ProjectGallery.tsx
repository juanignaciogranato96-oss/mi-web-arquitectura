"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ProjectGalleryProps = {
  images: string[];
  projectName: string;
};

export default function ProjectGallery({
  images,
  projectName,
}: ProjectGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      spaceBetween={24}
      loop
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      className="rounded-3xl border border-neutral-200 bg-neutral-50 p-3 shadow-sm"
    >
      {images.map((imageSrc, index) => (
        <SwiperSlide key={imageSrc}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-200">
            <Image
              src={imageSrc}
              alt={`${projectName} imagen ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
