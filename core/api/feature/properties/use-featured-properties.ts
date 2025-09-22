import { useInfiniteQuery } from "@tanstack/react-query";
import { listFeaturedProperties } from ".";

type PropertiesOptions = {
  pageSize: number;
};

const useFeaturedProperties = ({ pageSize }: PropertiesOptions) => {
  const {
    data,
    isFetchingNextPage,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    refetch,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["featured-properties", pageSize],
    queryFn: ({ pageParam }) =>
      listFeaturedProperties({
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

  const featuredProperties = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    featuredProperties,
    isFetchingNextPage,
    isRefetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    refetch,
  };
};

export default useFeaturedProperties;
