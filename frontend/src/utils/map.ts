import type { PopulationTooltipType, PopulationType } from "@/types/map";
import {
  FlyToInterpolator,
  MapController,
  type MapViewState,
  type TransitionInterpolator,
} from "@deck.gl/core";
import area from "@turf/area";
import type { Feature, Geometry, MultiPolygon, Polygon } from "geojson";

const densityStops = [
  { max: 100, color: [186, 187, 229] },
  { max: 500, color: [117, 120, 203] },
  { max: 1000, color: [79, 167, 126] },
  { max: 2000, color: [47, 100, 76] },
  { max: 5000, color: [255, 182, 73] },
  { max: Infinity, color: [197, 118, 0] },
];

export const speedAnimation = 2;

export type CustomViewState = MapViewState & {
  transitionInterpolator?: TransitionInterpolator;
  transitionDuration?: number | "auto";
};

export const controller = {
  type: MapController,
  dragMode: "pan" as const,
  scrollZoom: { smooth: true, speed: speedAnimation },
  doubleClickZoom: true,
  touchRotate: false,
  dragRotate: false,
  inertia: true,
};

export const initialViewState: CustomViewState = {
  longitude: 10,
  latitude: 50,
  zoom: 3.5,
  bearing: 0,
  pitch: 0,
  transitionInterpolator: new FlyToInterpolator({
    speed: speedAnimation,
  }),
  transitionDuration: "auto" as const,
};

export function getColor(density: number): Uint8Array {
  const stop = densityStops.find(({ max }) => density <= max);
  return new Uint8Array([...(stop?.color ?? [217, 217, 217]), 255]);
}

export function getFeatureAreaKm2(
  feature: Feature<Polygon | MultiPolygon, PopulationType>
): number {
  return area(feature) / 1_000_000;
}

export function getPopulationDensity(feature: Feature<Geometry, PopulationType>): number {
  if (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon") {
    const km2 = getFeatureAreaKm2(feature as Feature<Polygon | MultiPolygon, PopulationType>);
    return km2 > 0 ? feature.properties.T_sum / km2 : 0;
  }
  return 0;
}

export const tooltipHtmlTemplate = (feature: PopulationTooltipType) => {
  const { T_sum, M_sum, F_sum } = feature.properties;

  const formatNumber = (n: number) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

  const malePct = ((M_sum / T_sum) * 100).toFixed(1);
  const femalePct = ((F_sum / T_sum) * 100).toFixed(1);
  const areaKm2 = getFeatureAreaKm2(feature);

  return `
    <div class="px-2 pb-3 border-b border-white/10">
      <h3 class="font-semibold text-heading-md">Population Data</h3>
    </div>

    <div class="flex justify-between gap-4 p-2 text-body-xs">
      <span>Total Population</span>
      <p class="text-neon-400 text-numbers-md">${formatNumber(T_sum)}</p>
    </div>

    <div class="flex justify-between gap-4 p-2 border-y border-white/10 text-body-xs">
      <span>Male</span>
      <p class="text-neon-400 text-numbers-md">
        ${formatNumber(M_sum)} (${malePct}%)
      </p>
    </div>

    <div class="flex justify-between gap-4 p-2 text-body-xs">
      <span>Female</span>
      <p class="text-neon-400 text-numbers-md">
        ${formatNumber(F_sum)} (${femalePct}%)
      </p>
    </div>

    <div class="flex justify-between gap-4 p-2 text-body-xs">
      <span>Area</span>
      <p class="text-neon-400 text-numbers-md">${formatNumber(areaKm2)} km²</p>
    </div>
  `;
};
