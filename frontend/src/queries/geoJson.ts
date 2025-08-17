import api from "@/config/axios";
import { urls } from "@/utils/constants";

export const fetchGeoJSON = async () => {
  const res = await api.get(urls.geoJson);
  return res.data;
};
