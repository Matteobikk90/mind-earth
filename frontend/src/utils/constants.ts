export const nav = [
  { href: "/map", label: "Map" },
  { href: "/about", label: "About" },
];
export const proxyTarget = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const urls = {
  auth: "/api/auth",
  geoJson: "/api/geojson",
  populationStats: "/api/population_age",
};
