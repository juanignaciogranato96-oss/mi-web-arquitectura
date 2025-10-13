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
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const HERO_VIDEOS = ["/videos/hero.mp4", "/videos/hero_2.mp4"] as const;
const OVERLAY_BASE_CLASS = "bg-black/40";
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

  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-black text-center text-white min-h-[520px] sm:min-h-[600px] lg:min-h-[720px]">
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
          onEnded={() => handleVideoEnd(index)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-linear ${
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

      <motion.div
        className="relative z-10 w-full max-w-screen-lg px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20"
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-white/80 sm:text-sm">
          {badge}
        </h2>
        <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {hasSubtitle ? (
          <p className="mt-4 text-base text-neutral-200 sm:text-lg md:text-xl">
            {subtitle}
          </p>
        ) : null}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#projects"
            onClick={handleProjectsClick}
            className="w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200 sm:w-auto sm:px-6 sm:py-3"
          >
            {buttons.projects}
          </a>
          <Link
            href="/presupuesto"
            className="w-full rounded-full bg-neutral-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700 sm:w-auto sm:px-6 sm:py-3"
          >
            {buttons.quote}
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1b4332] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#1b4332]/30 transition-transform transition-colors hover:-translate-y-0.5 hover:scale-105 hover:bg-[#2d6a4f] sm:w-auto sm:px-6 sm:py-3"
          >
            <FaWhatsapp className="h-4 w-4" aria-hidden />
            <span>{buttons.whatsapp}</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
