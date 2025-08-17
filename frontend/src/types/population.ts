import type { GeoJSONFeature, GeoJSONGeometry } from "wellknown";

export type PopulationStatsType = {
  aoi_wkt: string;
  totals: {
    lt15: number;
    age15_64: number;
    gt65: number;
    all: number;
  };
  percentages: {
    lt15: number;
    age15_64: number;
    gt65: number;
  };
  name: string;
  country: string;
};

export type PopulationAgeParamsType = {
  feature: GeoJSONGeometry | GeoJSONFeature;
  name: string;
  country: string;
};
