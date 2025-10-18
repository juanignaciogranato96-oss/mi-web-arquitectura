"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const HERO_VIDEOS = ["/videos/hero.mp4", "/videos/hero_2.mp4"] as const;
const OVERLAY_BASE_CLASS = "bg-black/18";
const FADE_DURATION_MS = 600;
const HERO_ONE_MAX_TIME = 7; // seconds

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const hasSubtitle = subtitle.trim().length > 0;
  const prefersReducedMotion = useReducedMotion();
  const animationsEnabled = !prefersReducedMotion;

  const videos = useMemo(() => HERO_VIDEOS, []);

  const playVideo = (video: HTMLVideoElement | null) => {
    if (!video) return;
    const playPromise = video.play();
    if (playPromise instanceof Promise) {
      playPromise.catch(() => {
        // Ignore autoplay rejections silently
      });
    }
  };

  useEffect(() => {
    const initialVideo = videoRefs.current[0];
    if (!initialVideo) {
      return;
    }
    const handleLoaded = () => {
      playVideo(initialVideo);
    };
    if (initialVideo.readyState >= 2) {
      playVideo(initialVideo);
    } else {
      initialVideo.addEventListener("loadeddata", handleLoaded, { once: true });
    }
  }, []);

  useEffect(() => {
    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) {
      playVideo(currentVideo);
    }
  }, [activeIndex]);

  const scheduleTransition = useCallback(
    (index: number) => {
      const nextIndex = (index + 1) % videos.length;
      const nextVideo = videoRefs.current[nextIndex];

      setIsTransitioning(true);

      const activateNext = () => {
        if (nextVideo) {
          nextVideo.currentTime = 0;
        }
        playVideo(nextVideo ?? null);
        setActiveIndex(nextIndex);
        window.setTimeout(() => {
          setIsTransitioning(false);
        }, FADE_DURATION_MS);
      };

      if (!nextVideo) {
        activateNext();
        return;
      }

      if (nextVideo.readyState >= 2) {
        activateNext();
      } else {
        const handleLoaded = () => {
          nextVideo.removeEventListener("loadeddata", handleLoaded);
          activateNext();
        };
        nextVideo.pause();
        nextVideo.currentTime = 0;
        nextVideo.addEventListener("loadeddata", handleLoaded);
      }
    },
    [videos.length],
  );

  const heroOneTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (activeIndex !== 0) {
      if (heroOneTimerRef.current) {
        window.clearTimeout(heroOneTimerRef.current);
        heroOneTimerRef.current = null;
      }
      return;
    }
    const firstVideo = videoRefs.current[0];
    if (!firstVideo) {
      return;
    }

    const handleTimeUpdate = () => {
      if (firstVideo.currentTime >= HERO_ONE_MAX_TIME) {
        firstVideo.pause();
        firstVideo.removeEventListener("timeupdate", handleTimeUpdate);
        scheduleTransition(0);
      }
    };

    if (firstVideo.currentTime >= HERO_ONE_MAX_TIME) {
      scheduleTransition(0);
      return;
    }

    firstVideo.addEventListener("timeupdate", handleTimeUpdate);
    const remaining =
      HERO_ONE_MAX_TIME - firstVideo.currentTime > 0
        ? (HERO_ONE_MAX_TIME - firstVideo.currentTime) * 1000
        : 0;

    heroOneTimerRef.current = window.setTimeout(() => {
      firstVideo.removeEventListener("timeupdate", handleTimeUpdate);
      scheduleTransition(0);
    }, remaining);

    return () => {
      firstVideo.removeEventListener("timeupdate", handleTimeUpdate);
      if (heroOneTimerRef.current) {
        window.clearTimeout(heroOneTimerRef.current);
        heroOneTimerRef.current = null;
      }
    };
  }, [activeIndex, scheduleTransition]);

  const handleVideoEnd = (index: number) => {
    scheduleTransition(index);
  };

  const handleProjectsClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (onProjectsClick) {
      event.preventDefault();
      onProjectsClick();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 48 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut", staggerChildren: 0.12 },
    },
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative flex min-h-[720px] w-full items-center justify-center overflow-hidden bg-black text-center text-white sm:min-h-[860px] lg:min-h-[1040px]"
      data-scroll-section
    >
      <div
        className="absolute inset-0 -translate-y-10 transform-gpu sm:-translate-y-12 lg:-translate-y-16"
        data-scroll
        data-scroll-speed="-0.45"
        data-scroll-target="#hero"
      >
        {videos.map((videoSrc, index) => (
          <video
            key={videoSrc}
            ref={(element) => {
              videoRefs.current[index] = element;
            }}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            poster="/images/hero.webp"
            onEnded={() => handleVideoEnd(index)}
            className={`absolute inset-0 h-full w-full scale-[1.1] transform-gpu object-cover transition-opacity ease-linear ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
          />
        ))}

        <div
          className={`absolute inset-0 ${OVERLAY_BASE_CLASS} transition-opacity duration-500 ${
            isTransitioning ? "opacity-80" : "opacity-100"
          }`}
        />
      </div>

      {/* FIX: Alinear lineas decorativas al borde superior e inferior del Hero. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] flex justify-center">
        <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400/0 via-cyan-300/70 to-cyan-400/0 shadow-[0_0_16px_rgba(94,234,212,0.38)]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex justify-center">
        <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400/0 via-cyan-300/70 to-cyan-400/0 shadow-[0_0_16px_rgba(94,234,212,0.38)]" />
      </div>

      <motion.div
        id="hero"
        className="relative z-10 w-full max-w-screen-xl px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14"
        variants={animationsEnabled ? containerVariants : undefined}
        initial={animationsEnabled ? "hidden" : undefined}
        animate={animationsEnabled ? "visible" : undefined}
      >
        <motion.h2
          className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-white/80 sm:text-sm"
          variants={animationsEnabled ? elementVariants : undefined}
        >
          {badge}
        </motion.h2>
        <motion.h1
          className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
          variants={animationsEnabled ? elementVariants : undefined}
        >
          {title}
        </motion.h1>
        {hasSubtitle ? (
          <motion.p
            className="mt-4 text-base text-neutral-200 sm:text-lg md:text-xl"
            variants={animationsEnabled ? elementVariants : undefined}
          >
            {subtitle}
          </motion.p>
        ) : null}
        <motion.div
          className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
          variants={animationsEnabled ? elementVariants : undefined}
        >
          <motion.a
            href="#projects"
            onClick={handleProjectsClick}
            className="group w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors sm:w-auto sm:px-6 sm:py-3"
            whileHover={animationsEnabled ? { y: -4 } : undefined}
            whileTap={animationsEnabled ? { scale: 0.98 } : undefined}
          >
            <span className="inline-flex items-center gap-2">
              {buttons.projects}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </motion.a>
          <motion.div
            whileHover={animationsEnabled ? { y: -4 } : undefined}
            whileTap={animationsEnabled ? { scale: 0.98 } : undefined}
            className="w-full sm:w-auto"
          >
            <Link
              href="/presupuesto"
              className="inline-flex w-full items-center justify-center rounded-full bg-neutral-900/90 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 sm:w-auto sm:px-6 sm:py-3"
            >
              {buttons.quote}
            </Link>
          </motion.div>
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1b4332] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#1b4332]/30 transition sm:w-auto sm:px-6 sm:py-3"
            whileHover={animationsEnabled ? { scale: 1.05, y: -6 } : undefined}
            whileTap={animationsEnabled ? { scale: 0.98 } : undefined}
          >
            <FaWhatsapp className="h-4 w-4" aria-hidden />
            <span>{buttons.whatsapp}</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
