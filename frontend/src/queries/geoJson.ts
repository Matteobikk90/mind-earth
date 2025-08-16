import { urls } from "@/utils/constants";

export const fetchGeoJSON = async () => {
  const res = await fetch(urls.geoJson);

  if (!res.ok) {
    throw new Error("Failed to fetch GeoJSON");
  }
  return res.json();
};
