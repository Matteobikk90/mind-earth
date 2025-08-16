import type { AuthSliceType } from "@/app/types/auth";
import type { StateCreator } from "zustand";

export const createAuthSlice: StateCreator<AuthSliceType> = (set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
});
