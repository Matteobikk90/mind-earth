import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";

export type PopulationType = {
  T_sum: number;
  M_sum: number;
  F_sum: number;
  AREA: number;
};

export type PopulationTooltipType = Feature<Polygon | MultiPolygon, PopulationType>;

export type PopulationResponseType = FeatureCollection<Polygon | MultiPolygon, PopulationType>;
