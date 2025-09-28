import { queryKeys } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUserNotifications } from ".";

type NotificationsOptions = {
  pageSize: number;
  userId: string;
};

const useUserNotifications = ({ pageSize, userId }: NotificationsOptions) => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    status,
    isRefetching,
    hasNextPage,
    isLoading,
    isPending,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: queryKeys.NOTIFICATIONS,
    queryFn: ({ pageParam }) =>
      fetchUserNotifications(
        {
          page: pageParam,
          pageSize,
        },
        userId
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.page >= lastPage.totalPages) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });

  const notifications = data?.pages.flatMap((page) => page.data) ?? [];
  // useWebSocketStore.getState().setMessages(notifications);

  return {
    notifications,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    status,
    error,
    isPending,
    isRefetching,
    refetch,
  };
};

export default useUserNotifications;
