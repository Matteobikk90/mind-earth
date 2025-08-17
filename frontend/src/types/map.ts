import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";

export type PopulationType = {
  NUTS_ID: string;
  LEVL_CODE: number;
  CNTR_CODE: string;
  NAME_LATN: string;
  NUTS_NAME: string;
  MOUNT_TYPE: number;
  URBN_TYPE: number;
  COAST_TYPE: number;
  T_sum: number;
  M_sum: number;
  F_sum: number;
  pixel_count: number;
};

export type PopulationTooltipType = Feature<Polygon | MultiPolygon, PopulationType>;

export type PopulationResponseType = FeatureCollection<Polygon | MultiPolygon, PopulationType>;
