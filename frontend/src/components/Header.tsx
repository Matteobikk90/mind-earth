"use client";

import { useTheme } from "@/hooks/useTheme";
import { useStore } from "@/store";
import { nav } from "@/utils/constants";
import { default as Image } from "next/image";
import { default as Link } from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useShallow } from "zustand/shallow";

export default function Header() {
  const pathname = usePathname();
  const isDark = useTheme();
  const { token, clearToken } = useStore(
    useShallow(({ token, clearToken }) => ({
      token,
      clearToken,
    }))
  );

  const logoSrc = isDark ? "/assets/images/logo-positive.png" : "/assets/images/logo-negative.png";

  const items = useMemo(() => {
    if (!token) return [];
    return nav.map((item) => {
      const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
      return { ...item, active };
    });
  }, [pathname, token]);

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

        {token ? (
          <button
            className="ml-4 rounded-full bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
            onClick={clearToken}
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-primary hover:bg-primary/90 ml-4 rounded-full px-3 py-1 text-sm text-white"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
