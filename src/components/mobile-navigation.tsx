"use client";

import { useState } from "react";
import { NavigationLinks, type NavigationItem } from "./navigation-links";
import { cn } from "@/lib/utils";

type MobileNavigationProps = {
  items: NavigationItem[];
  label: string;
};

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 6L18 18" />
        <path d="M6 18L18 6" />
      </svg>
    );
  }
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 7H20" />
      <path d="M4 12H20" />
      <path d="M4 17H16" />
    </svg>
  );
}

export function MobileNavigation({ items, label }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label="Toggle navigation"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white/80 text-neutral-700 backdrop-blur transition hover:border-neutral-300"
      >
        <MenuIcon open={open} />
      </button>

      <div
        className={cn(
          "absolute inset-x-4 top-20 origin-top rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl transition-transform duration-200",
          open ? "scale-y-100 opacity-100" : "pointer-events-none scale-y-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              {label}
            </span>
          </div>
          <nav className="flex flex-col gap-2">
            <NavigationLinks items={items} onNavigate={close} />
          </nav>
        </div>
      </div>
    </div>
  );
}
