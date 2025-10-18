"use client";

import {
  createContext,
  type MutableRefObject,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { LazyMotion, domAnimation } from "framer-motion";

import type LocomotiveScroll from "locomotive-scroll";

type SmoothScrollContextValue = {
  scroll: LocomotiveScroll | null;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  isEnabled: boolean;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(
  null,
);

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error(
      "useSmoothScroll must be used within a SmoothScrollProvider",
    );
  }
  return context;
}

type SmoothScrollProviderProps = {
  children: ReactNode;
};

function shouldEnableSmoothScroll() {
  if (typeof window === "undefined") {
    return false;
  }
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const connection =
    (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;
  const saveData = Boolean(connection?.saveData);
  const isSmallViewport = window.innerWidth < 1024;
  return !prefersReducedMotion && !saveData && !isSmallViewport;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollInstance, setScrollInstance] =
    useState<LocomotiveScroll | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const update = () => {
      setIsEnabled(shouldEnableSmoothScroll());
    };
    update();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => update();

    window.addEventListener("resize", update);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", update);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!isEnabled) {
      if (scrollInstance) {
        scrollInstance.destroy();
        setScrollInstance(null);
      }
      return;
    }

    let resizeObserver: ResizeObserver | null = null;
    let rafId: number | null = null;
    let instance: LocomotiveScroll | null = null;

    const scheduleUpdate = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      rafId = window.requestAnimationFrame(() => {
        instance?.update();
      });
    };

    const initialize = async () => {
      const LocomotiveScrollModule = await import("locomotive-scroll");
      const Scroll = LocomotiveScrollModule.default;
      if (!containerRef.current) {
        return;
      }

      instance = new Scroll({
        el: containerRef.current,
        smooth: true,
        multiplier: 1,
        lerp: 0.08,
        smartphone: { smooth: false },
        tablet: { smooth: false },
      });

      setScrollInstance(instance);

      if ("ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(scheduleUpdate);
        resizeObserver.observe(containerRef.current);
      }

      window.addEventListener("resize", scheduleUpdate);
      window.addEventListener("load", scheduleUpdate);
    };

    initialize().catch(() => {
      setScrollInstance(null);
      setIsEnabled(false);
    });

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("load", scheduleUpdate);
      resizeObserver?.disconnect();
      instance?.destroy();
      setScrollInstance(null);
    };
  }, [isEnabled, scrollInstance]);

  useEffect(() => {
    if (!scrollInstance || typeof window === "undefined") {
      return;
    }
    const rafId = window.requestAnimationFrame(() => {
      scrollInstance.update();
    });
    return () => window.cancelAnimationFrame(rafId);
  }, [scrollInstance]);

  useEffect(() => {
    if (!scrollInstance) {
      return;
    }
    scrollInstance.update();
    scrollInstance.scrollTo(0, { duration: 0 });
  }, [pathname, scrollInstance]);

  const contextValue = useMemo(
    () => ({
      scroll: scrollInstance,
      containerRef,
      isEnabled,
    }),
    [scrollInstance, isEnabled],
  );

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      <LazyMotion features={domAnimation}>
        <div
          ref={containerRef}
          data-scroll-container={isEnabled ? true : undefined}
        >
          {children}
        </div>
      </LazyMotion>
    </SmoothScrollContext.Provider>
  );
}
