import type { PopulationType } from "@/types/map";
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

function hexToRgba(hex: string, alpha = 255): [number, number, number, number] {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255, alpha];
}

export function getColor(
  density: number,
  palette: keyof typeof sequentialPalettes = "blue"
): Uint8Array {
  const step = Math.min(100, Math.max(10, Math.ceil(((density / 5000) * 100) / 10) * 10));
  const hex =
    sequentialPalettes[palette][step as keyof (typeof sequentialPalettes)[typeof palette]];
  return new Uint8Array(hexToRgba(hex));
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
