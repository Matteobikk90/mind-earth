import type { PopulationType } from "@/types/map";
import type { PaletteKey } from "@/types/palette";
import { sequentialPalettes } from "@/utils/colors";
import {
  FlyToInterpolator,
  MapController,
  type MapViewState,
  type TransitionInterpolator,
} from "@deck.gl/core";
import area from "@turf/area";
import type { Feature, Geometry, MultiPolygon, Polygon } from "geojson";

export const speedAnimation = 2;
export const densityThreshold = 30;
export const lineColors: Record<"black" | "white", [number, number, number]> = {
  black: [0, 0, 0],
  white: [255, 255, 255],
};
export const lineWidth = 0.5;

export type CustomViewState = MapViewState & {
  transitionInterpolator?: TransitionInterpolator;
  transitionDuration?: number | "auto";
};

export const lineStyle = { black: [0, 0, 0], white: [255, 255, 255], width: 0.5 };

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

export function getColor(density: number, palette: PaletteKey, isDark: boolean): Uint8Array {
  let steps = Object.entries(sequentialPalettes[palette]).map(([k, hex]) => ({
    stop: parseInt(k, 10),
    color: hexToRgb(hex),
  }));

  if (isDark) {
    steps = steps.reverse();
  }

  const stop = steps.find(({ stop }) => density <= stop) ?? steps[steps.length - 1];

  return new Uint8Array([...stop.color, 255]);
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
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
