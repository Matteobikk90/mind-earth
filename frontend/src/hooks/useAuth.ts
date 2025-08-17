import api from "@/config/axios";
import { urls } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get(urls.getMe);
      return res.data;
    },
    retry: false,
  });

  const user = useMemo(() => {
    if (!data || isError) return null;
    return data;
  }, [data, isError]);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    isError,
  };
};
