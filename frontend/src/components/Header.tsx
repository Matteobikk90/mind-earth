"use client";

import { useTheme } from "@/hooks/useTheme";
import { useStore } from "@/store";
import { nav } from "@/utils/constants";
import { default as Image } from "next/image";
import { default as Link } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useShallow } from "zustand/shallow";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
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

  const handleLogout = () => {
    clearToken();
    router.push("/");
  };

  return (
    <header className="bg-background text-foreground z-1 relative max-h-max flex-1 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-background)]">
      <nav className="border-foreground container m-auto flex items-center justify-between gap-2 border-b p-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logoSrc} alt="Mind Earth Logo" width={150} height={150} priority />
          <span className="sr-only">Mind Earth</span>
        </Link>
        <ul className="flex items-center justify-between gap-2 md:gap-8">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                aria-current={it.active ? "page" : undefined}
                className={[
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  it.active ? "text-foreground" : "",
                ].join(" ")}
              >
                {it.label}
              </Link>
            </li>
          ))}
          {token ? (
            <li>
              <button
                className="rounded-md bg-red-500 px-3 py-1 text-sm hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link href="/login" className="bg-primary rounded-md px-3 py-1 text-sm">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
