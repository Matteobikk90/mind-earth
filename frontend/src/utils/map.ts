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

export function tooltipHtmlTemplate(feature: PopulationTooltipType): string {
  const {
    NUTS_NAME,
    CNTR_CODE,
    COAST_TYPE,
    LEVL_CODE,
    NAME_LATN,
    URBN_TYPE,
    M_sum,
    MOUNT_TYPE,
    T_sum,
    F_sum,
    NUTS_ID,
    pixel_count,
  } = feature.properties;

  return `
    <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; margin-bottom: 6px;">
      <h3 style="margin: 0; font-size: 14px; font-weight: 600;">
        ${NUTS_NAME} (${CNTR_CODE})
      </h3>
      <small style="opacity: 0.7;">${NAME_LATN} — ID: ${NUTS_ID}</small>
    </div>

    <div style="font-size: 12px; line-height: 1.4;">
      <div style="display: flex; justify-content: space-between;">
        <span>Total Population:</span>
        <span><b>${T_sum.toLocaleString()}</b></span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Male:</span>
        <span>${M_sum.toLocaleString()}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Female:</span>
        <span>${F_sum.toLocaleString()}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Pixel Count:</span>
        <span>${pixel_count.toLocaleString()}</span>
      </div>
    </div>

    <div style="margin-top: 6px; font-size: 11px; opacity: 0.7;">
      Level: ${LEVL_CODE} | Urban: ${URBN_TYPE} | Coast: ${COAST_TYPE} | Mountain: ${MOUNT_TYPE}
    </div>
  `;
}
