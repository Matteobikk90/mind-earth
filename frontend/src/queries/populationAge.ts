import api from "@/config/axios";
import type { PopulationAgeParamsType } from "@/types/population";
import { urls } from "@/utils/constants";
import wellknown from "wellknown";

export async function getPopulationAge({ feature, name, country }: PopulationAgeParamsType) {
  const aoi_wkt = wellknown.stringify(feature);

  const res = await api.post(urls.populationStats, { aoi_wkt });

  const stats = res.data;

  return {
    ...stats,
    name,
    country,
  };
}
