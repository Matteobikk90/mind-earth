import type { PaletteKey } from "@/types/palette";

export type MapSliceType = {
  palette: PaletteKey;
  setPalette: (palette: MapSliceType["palette"]) => void;
  threshold: number | null;
  toggleThreshold: () => void;
};
