import type { MapSliceType } from "@/types/store/map";
import { densityThreshold } from "@/utils/map";
import type { StateCreator } from "zustand";

export const createMapSlice: StateCreator<MapSliceType> = (set) => ({
  palette: "blue",
  setPalette: (palette) => set({ palette }),
  threshold: null,
  toggleThreshold: () =>
    set((state) => ({
      threshold: state.threshold === null ? densityThreshold : null,
    })),
});
