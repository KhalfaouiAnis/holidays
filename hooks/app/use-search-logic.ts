import { QUERY_DEBOUNCE_THRESHOLD, queryKeys } from "@/constants";
import { client } from "@/core/api/client";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useSearchLogic = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(
    searchQuery,
    QUERY_DEBOUNCE_THRESHOLD
  );

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: [queryKeys.PROPERTIES_SEARCH, debouncedSearchQuery],
    queryFn: async () => {
      if (debouncedSearchQuery) {
        const { data } = await client.get(
          `/properties/search?city=${debouncedSearchQuery}`
        );
        return data.data;
      } else {
        return [];
      }
    },
    staleTime: 1000 * 60,
  });

  return { properties, isLoading, searchQuery, setSearchQuery };
};
