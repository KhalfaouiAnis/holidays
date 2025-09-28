import { queryKeys } from "@/constants";
import { client } from "@/core/api/client";
import useAuth from "@/core/auth";
import { useWebSocketStore } from "@/core/store";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/shallow";

type UserStat = {
  role: string;
  name: string;
  username: string;
  avatar: string;
  favoriteCount: number;
  bookingsCount: number;
};

export const useProfileLogic = () => {
  const { signOut, user } = useAuth();
  const { disconnect } = useWebSocketStore(useShallow((state) => state));
  const { data, isLoading, refetch } = useQuery<UserStat>({
    queryKey: queryKeys.USER_PROFILE_STATS,
    queryFn: async () => {
      const { data } = await client.get("/users/stats");
      return data.stats;
    },
  });

  function handleLogout() {
    disconnect();
    signOut();
  }

  return { handleLogout, user, data, isLoading, refetch };
};
