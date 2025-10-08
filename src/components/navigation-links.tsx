"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type NavigationItem = {
  label: string;
  href: string;
};

type NavigationLinksProps = {
  items: NavigationItem[];
  onNavigate?: () => void;
};

export function NavigationLinks({ items, onNavigate }: NavigationLinksProps) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname?.startsWith(`${item.href}`));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "rounded-full px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "text-neutral-900"
                : "text-neutral-500 hover:text-neutral-900",
            )}
            aria-current={isActive ? "true" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
