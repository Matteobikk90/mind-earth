"use client";

import { useStore } from "@/store";

export function useTheme() {
  const mode = useStore(({ mode }) => mode);

  return mode === "dark";
}
