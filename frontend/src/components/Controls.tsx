"use client";

import { useStore } from "@/store";
import type { PaletteKey } from "@/types/palette";
import { palettes } from "@/utils/colors";
import { densityThreshold } from "@/utils/map";
import { useShallow } from "zustand/shallow";

export default function Controls() {
  const { palette, setPalette, threshold, toggleThreshold } = useStore(
    useShallow(({ palette, setPalette, threshold, toggleThreshold }) => ({
      palette,
      setPalette,
      threshold,
      toggleThreshold,
    }))
  );

  return (
    <aside className="z-10 mt-4 w-56 space-y-4 rounded-lg border border-white/15 bg-[rgba(19,23,61,0.7)] p-4 text-sm text-white backdrop-blur-md">
      <h2 className="mb-2 font-semibold">Color Palette</h2>
      <select
        className="w-full rounded-md border border-white/20 bg-[#13173d]/50 px-2 py-1 focus:outline-none"
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
          className="h-4 w-4 rounded border-gray-400"
        />
        <label htmlFor="density-filter">Exclude density &lt; {densityThreshold}</label>
      </div>
    </aside>
  );
}
