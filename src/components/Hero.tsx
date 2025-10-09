"use client";

import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const HERO_VIDEOS = ["/videos/hero.mp4", "/videos/hero_2.mp4"] as const;
const OVERLAY_OPACITY = "bg-black/40";

type HeroProps = {
  badge: string;
  title: string;
  subtitle: string;
  buttons: {
    projects: string;
    quote: string;
    whatsapp: string;
  };
  onProjectsClick?: () => void;
  whatsappUrl: string;
};

export default function Hero({
  badge,
  title,
  subtitle,
  buttons,
  onProjectsClick,
  whatsappUrl,
}: HeroProps) {
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, 10000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const currentVideo = HERO_VIDEOS[videoIndex];

  const handleProjectsClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (onProjectsClick) {
      event.preventDefault();
      onProjectsClick();
    }
  };

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden text-center text-white">
      <video
        key={currentVideo}
        src={currentVideo}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero.webp"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
      />
      <div className={`absolute inset-0 ${OVERLAY_OPACITY}`} />
      <motion.div
        className="relative z-10 max-w-3xl px-6"
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
          {badge}
        </h2>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-neutral-200 sm:text-xl">{subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            onClick={handleProjectsClick}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200"
          >
            {buttons.projects}
          </a>
          <Link
            href="/presupuesto"
            className="rounded-full bg-neutral-800 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
          >
            {buttons.quote}
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#1b4332] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#2d6a4f]"
          >
            {buttons.whatsapp}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
