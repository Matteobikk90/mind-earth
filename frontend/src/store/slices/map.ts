import type { MapSliceType } from "@/types/store/map";
import type { StateCreator } from "zustand";

export const createMapSlice: StateCreator<MapSliceType> = (set) => ({
  palette: "blue",
  threshold: 0,
  setPalette: (palette) => set({ palette }),
  setThreshold: (value) => set({ threshold: value }),
});
