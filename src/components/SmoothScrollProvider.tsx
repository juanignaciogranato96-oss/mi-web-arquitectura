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

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollInstance, setScrollInstance] =
    useState<LocomotiveScroll | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let resizeObserver: ResizeObserver | null = null;
    let rafId: number | null = null;
    let instance: LocomotiveScroll | null = null;
    const update = () => {
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
        smartphone: { smooth: true },
        tablet: { smooth: true },
      });

      setScrollInstance(instance);

      if ("ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(update);
        resizeObserver.observe(containerRef.current);
      }

      window.addEventListener("resize", update);
      window.addEventListener("load", update);
    };

    initialize().catch(() => {
      // Fail silently if locomotive-scroll cannot be initialized
    });

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("resize", update);
      window.removeEventListener("load", update);
      resizeObserver?.disconnect();
      instance?.destroy();
      setScrollInstance(null);
    };
  }, []);

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
    }),
    [scrollInstance],
  );

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      <LazyMotion features={domAnimation}>
        <div ref={containerRef} data-scroll-container>
          {children}
        </div>
      </LazyMotion>
    </SmoothScrollContext.Provider>
  );
}
