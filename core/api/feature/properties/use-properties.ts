import { queryKeys } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { listProperties } from ".";

type PropertiesOptions = {
  pageSize: number;
};

const useProperties = ({ pageSize }: PropertiesOptions) => {
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
    queryKey: queryKeys.PROPERTIES,
    queryFn: ({ pageParam }) =>
      listProperties({
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

  const properties = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    properties,
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

export default useProperties;
