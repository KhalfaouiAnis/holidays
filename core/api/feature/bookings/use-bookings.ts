import { queryKeys } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { listBookings } from ".";

type BookingsOptions = {
  pageSize: number;
};

const useBookings = ({ pageSize }: BookingsOptions) => {
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
    queryKey: queryKeys.BOOKINGS,
    queryFn: ({ pageParam }) =>
      listBookings({
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

  const bookings = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    bookings,
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

export default useBookings;
