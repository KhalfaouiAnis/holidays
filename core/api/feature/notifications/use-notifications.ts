import { queryKeys } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNotifications } from ".";

type NotificationsOptions = {
  pageSize: number;
};

const useNotifications = ({ pageSize }: NotificationsOptions) => {
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
    refetch
  } = useInfiniteQuery({
    queryKey: queryKeys.NOTIFICATIONS,
    queryFn: ({ pageParam }) =>
      fetchNotifications({
        page: pageParam,
        pageSize,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.page >= lastPage.totalPages) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });

  const notifications = data?.pages.flatMap((page) => page.data) ?? [];

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

export default useNotifications;
