import { createMapSlice } from "@/store/slices/map";
import { createThemeSlice } from "@/store/slices/theme";
import type { MapSliceType } from "@/types/store/map";
import type { ThemeSliceType } from "@/types/store/theme";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

type StoreState = ThemeSliceType & MapSliceType;

export const useStore = create<StoreState>()(
  persist(
    subscribeWithSelector((set, get, store) => ({
      ...createThemeSlice(set, get, store),
      ...createMapSlice(set, get, store),
    })),
    {
      name: "global-store",
      partialize: ({ mode, palette, threshold }) => ({
        mode,
        palette,
        threshold,
      }),
    }
  )
);
