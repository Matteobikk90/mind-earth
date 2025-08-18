"use client";

import { useStore } from "@/store";
import type { PaletteKey } from "@/types/palette";
import { palettes } from "@/utils/colors";
import { densityThreshold } from "@/utils/map";
import { useShallow } from "zustand/shallow";

export default function Filters() {
  const { palette, setPalette, threshold, toggleThreshold } = useStore(
    useShallow((state) => ({
      ...state,
    }))
  );

  return (
    <aside aria-label="filters">
      <h2 className="mb-2 font-semibold">Filters</h2>
      <label htmlFor="palette-select" className="mb-2 block font-semibold">
        Color Palette
      </label>
      <select
        id="palette-select"
        className="border-foreground/20 bg-background/70 text-foreground focus:ring-primary w-full rounded-md border px-2 py-1 focus:outline-none focus:ring-1"
        value={palette}
        onChange={(e) => setPalette(e.target.value as PaletteKey)}
      >
        {palettes.map((p) => (
          <option key={p} value={p}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <input
          id="density-filter"
          type="checkbox"
          checked={threshold !== null}
          onChange={toggleThreshold}
          className="border-foreground/30 accent-primary h-4 w-4 rounded"
        />
        <label htmlFor="density-filter">Exclude density &lt; {densityThreshold}</label>
      </div>
    </aside>
  );
}
