"use client";

import Logo from "@/components/Logo";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import api from "@/config/axios";
import { queryClient } from "@/config/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { nav, urls } from "@/utils/constants";
import { default as Link } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const items = useMemo(() => {
    if (!isAuthenticated) return [];
    return nav.map((item) => {
      const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
      return { ...item, active };
    });
  }, [pathname, isAuthenticated]);

  const handleLogout = async () => {
    try {
      await api.post(urls.logout);
    } catch (err) {
      console.error("Logout failed", err);
    }
    queryClient.setQueryData(["me"], null);
    router.push("/");
  };

  return (
    <header className="bg-background text-foreground z-1 relative max-h-max flex-1 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-background)]">
      <nav className="border-foreground container m-auto flex items-center justify-between gap-2 border-b p-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="sr-only">Mind Earth</span>
        </Link>
        <ul className="flex items-center justify-between gap-2 md:gap-8">
          <ThemeToggleButton />
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
          {isAuthenticated ? (
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
