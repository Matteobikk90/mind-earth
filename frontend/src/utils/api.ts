import api from "@/config/axios";
import axios, { type AxiosRequestConfig } from "axios";

type MethodType = "GET" | "POST";
const controllers = new Map<string, AbortController>();

export const axiosRequest = async <TResponse, TBody = unknown>(
  method: MethodType,
  url: string,
  data?: TBody,
  cancelKey?: string,
  externalConfig?: AxiosRequestConfig
): Promise<TResponse | undefined> => {
  if (cancelKey && controllers.has(cancelKey)) {
    controllers.get(cancelKey)!.abort();
  }

  const controller = new AbortController();
  if (cancelKey) controllers.set(cancelKey, controller);
  const config: AxiosRequestConfig = {
    ...externalConfig,
    signal: controller.signal,
  };

  try {
    const response =
      method === "GET"
        ? await api.get<TResponse>(url, config)
        : await api.post<TResponse>(url, data, config);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_CANCELED" || error.response?.status === 499) {
        console.warn("Request canceled");
        return undefined;
      }
      console.error(`Axios error: ${error.response?.status || "Unknown"} - ${error.message}`);
    } else {
      console.error("Unexpected error occurred", error);
    }
    throw error;
  } finally {
    if (cancelKey) controllers.delete(cancelKey);
  }
};

// Axios helpers
export const axiosGet = async <T>(url: string, cancelKey?: string) =>
  axiosRequest<T>("GET", url, undefined, cancelKey);

export const axiosPost = async <TResponse, TBody>(url: string, data: TBody, cancelKey?: string) =>
  axiosRequest<TResponse, TBody>("POST", url, data, cancelKey);
