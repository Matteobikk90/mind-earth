import { createAuthSlice } from "@/app/store/slices/auth";
import { createThemeSlice } from "@/app/store/slices/theme";
import type { AuthSliceType } from "@/app/types/auth";
import type { ThemeSliceType } from "@/app/types/theme";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

type StoreState = ThemeSliceType & AuthSliceType;

export const useStore = create<StoreState>()(
  persist(
    subscribeWithSelector((set, get, store) => ({
      ...createThemeSlice(set, get, store),
      ...createAuthSlice(set, get, store),
    })),
    {
      name: "global-store",
      partialize: ({ mode, token }) => ({
        mode,
        token,
      }),
    }
  )
);
