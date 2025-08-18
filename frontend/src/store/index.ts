import { createMapSlice } from "@/store/slices/map";
import type { MapSliceType } from "@/types/store/map";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

type StoreState = MapSliceType;

export const useStore = create<StoreState>()(
  persist(
    subscribeWithSelector((set, get, store) => ({
      ...createMapSlice(set, get, store),
    })),
    {
      name: "global-store",
      partialize: ({ palette, threshold }) => ({
        palette,
        threshold,
      }),
    }
  )
);
