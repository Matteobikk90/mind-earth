import { QueryClient } from "@tanstack/react-query";

const defaultOptions = {
  queries: {
    retry: 1,
    staleTime: 60 * 60 * 1000,
    cacheTime: 2 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions });
