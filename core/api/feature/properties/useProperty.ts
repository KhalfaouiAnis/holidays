import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";

export default function useProperty(id: string | string[]) {
  const { data: property, isLoading } = useQuery<Property>({
    queryKey: [queryKeys.PROPERTY + id],
    queryFn: async () => {
      const { data } = await client.get(`/properties/${id}`);
      return data.property;
    },
  });

  return { property, isLoading };
}
