export const nav = [
  { href: "/map", label: "Map" },
  { href: "/about", label: "About" },
];
export const proxyTarget = process.env.NEXT_PUBLIC_API_URL || "http://backend:8000";

export const urls = {
  login: "/auth/login",
  register: "/auth/register",
  geoJson: "/geojson",
  populationStats: "/population_age",
};
