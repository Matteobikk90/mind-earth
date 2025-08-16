import type { ThemeSliceType } from "@/app/types/theme";
import type { StateCreator } from "zustand";

export const createThemeSlice: StateCreator<ThemeSliceType> = (set) => ({
  mode: "light" as "light" | "dark",
  background: "",
  toggleTheme: () =>
    set((state) => ({
      mode: state.mode === "light" ? "dark" : "light",
    })),
  updateBackground: () =>
    set(() => ({
      background: "--foreground",
    })),
});
