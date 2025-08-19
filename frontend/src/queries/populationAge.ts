import type { PopulationAgeParamsType, PopulationStatsType } from "@/types/population";
import { axiosPost } from "@/utils/api";
import { urls } from "@/utils/constants";
import wellknown from "wellknown";

export async function getPopulationAge({ feature, name, country }: PopulationAgeParamsType) {
  const aoi_wkt = wellknown.stringify(feature);

  try {
    const stats = await axiosPost<PopulationStatsType, { aoi_wkt: string }>(
      urls.populationStats,
      {
        aoi_wkt,
      },
      "population_age"
    );

    if (!stats) {
      return undefined;
    }

    return { ...stats, name, country };
  } catch (error) {
    console.error("Failed to get population stats:", error);
    throw error;
  }
}
