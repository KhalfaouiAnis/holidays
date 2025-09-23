import { queryKeys } from "@/constants";
import { client } from "@/core/api/client";
import useAuth from "@/core/auth";
import { useQuery } from "@tanstack/react-query";

type UserStat = {
  email: string;
  name: string;
  username: string;
  avatar: string;
  favoriteCount: number;
  bookingsCount: number;
};

export const useProfileLogic = () => {
  const { signOut, user } = useAuth();
  const { data, isLoading, refetch } = useQuery<UserStat>({
    queryKey: queryKeys.USER_PROFILE_STATS,
    queryFn: async () => {
      const { data } = await client.get("/users/stats");
      return data.stats;
    },
  });

  return { signOut, user, data, isLoading, refetch };
};
