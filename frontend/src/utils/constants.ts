export const nav = [
  { href: "/map", label: "Map" },
  { href: "/about", label: "About" },
];
export const proxyTarget = process.env.NEXT_PUBLIC_API_URL || "http://backend:8000";

export const urls = {
  getMe: "/auth/me",
  login: "/auth/login",
  logout: "/auth/logout",
  register: "/auth/register",
  geoJson: "/geojson",
  populationStats: "/population_age",
};
