"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      className="bg-background button rounded-md border !p-1 shadow-md"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="toggle-theme"
    >
      {isDark ? (
        <SunIcon className="size-5" weight="duotone" />
      ) : (
        <MoonIcon className="size-5" weight="duotone" />
      )}
    </button>
  );
}
