"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <button className="rounded-md border p-1" aria-label="toggle-theme" disabled></button>;
  }

  const isDark = theme === "dark";

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
