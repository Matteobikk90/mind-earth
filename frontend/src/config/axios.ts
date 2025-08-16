import { useStore } from "@/store";
import { proxyTarget } from "@/utils/constants";
import axios from "axios";

const api = axios.create({
  baseURL: proxyTarget,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
