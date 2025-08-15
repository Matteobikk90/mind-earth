"use client";

import { useTheme } from "@/app/hooks/useTheme";
import { nav } from "@/app/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Header() {
  const pathname = usePathname();
  const isDark = useTheme();
  const logoSrc = isDark ? "/assets/images/logo-negative.png" : "/assets/images/logo-positive.png";

  const items = useMemo(
    () =>
      nav.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return { ...item, active };
      }),
    [pathname]
  );

  return (
    <header className="bg-[var(--color-background)]/80 supports-[backdrop-filter]:bg-[var(--color-background)]/60 container m-auto flex items-center justify-between border-b border-[color:var(--color-blue-20)] p-4 text-[var(--color-foreground)] backdrop-blur">
      <Link href="/" className="flex items-center gap-2">
        <Image src={logoSrc} alt="Mind Earth Logo" width={150} height={150} priority />
        <span className="sr-only">Mind Earth</span>
      </Link>

      <nav className="flex items-center gap-2">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            aria-current={it.active ? "page" : undefined}
            className={[
              "rounded-md px-3 py-1.5 text-sm transition-colors",
              it.active
                ? "bg-[var(--color-blue-10)] text-[var(--color-background)]"
                : "text-[var(--color-blue-70)] hover:bg-[var(--color-blue-10)] hover:text-[var(--color-blue-90)]",
            ].join(" ")}
          >
            {it.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
