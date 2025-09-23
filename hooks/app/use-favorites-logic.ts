import { queryKeys } from "@/constants";
import { client } from "@/core/api/client";
import { useQuery } from "@tanstack/react-query";

export const useFavoritesLogic = () => {
  const { data, isLoading, refetch } = useQuery<Property[]>({
    queryKey: queryKeys.FAVORITES,
    queryFn: async () => {
      const { data } = await client.get("/favorites");

      return data.favorites;
    },
  });

  return { data, isLoading, refetch };
};
