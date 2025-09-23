import { queryKeys } from "@/constants";
import { client } from "@/core/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleRate = (onRateSettled?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ propertyId }: { propertyId: string }) => {
      const { data } = await client.post(`/properties/ratings/${propertyId}`);
      return data;
    },
    onSettled: () => {
      typeof onRateSettled === "function" && onRateSettled();
      queryClient.invalidateQueries({
        queryKey: queryKeys.PROPERTIES,
      });
    },
  });
};
