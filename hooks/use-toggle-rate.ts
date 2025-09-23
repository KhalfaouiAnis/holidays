import { client } from "@/core/api/client";
import { PAGE_SIZE } from "@/core/api/common";
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
        queryKey: ["properties", PAGE_SIZE],
      });
    },
  });
};
