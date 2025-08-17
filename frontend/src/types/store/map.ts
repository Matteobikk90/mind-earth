import type { PaletteKey } from "@/types/palette";

export type MapSliceType = {
  palette: PaletteKey;
  threshold: number;
  setPalette: (palette: PaletteKey) => void;
  setThreshold: (value: number) => void;
};
