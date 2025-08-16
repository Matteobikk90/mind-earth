"use client";

import { useStore } from "@/app/store";

export function useTheme() {
  const mode = useStore(({ mode }) => mode);

  return mode === "dark";
}
