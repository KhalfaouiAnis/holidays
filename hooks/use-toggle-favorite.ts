import { queryKeys } from "@/constants";
import { client } from "@/core/api/client";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type ToggleFavoriteParams = {
  propertyId: string;
  currentFavoriteStatus: boolean;
};

export const useToggleFavorite = (
  onSuccess?: () => void,
  onFailure?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ propertyId }: ToggleFavoriteParams) => {
      const { data } = await client.post(`/favorites/${propertyId}`);
      return data;
    },
    onMutate: async ({
      currentFavoriteStatus,
      propertyId,
    }: ToggleFavoriteParams) => {
      const queryKey = queryKeys.PROPERTIES;
      await queryClient.cancelQueries({
        queryKey,
      });

      const previousData =
        queryClient.getQueryData<InfiniteData<PagedResult<Property>>>(queryKey);

      queryClient.setQueryData<InfiniteData<PagedResult<Property>>>(
        queryKey,
        (old) => {
          if (!old) {
            return old;
          }
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              properties: page.data.map((property) => {
                if (property.id === propertyId) {
                  return {
                    ...property,
                    is_favorite: !currentFavoriteStatus,
                  };
                }
                return property;
              }),
            })),
          };
        }
      );
      return {
        previousData,
        queryKey,
      };
    },

    onError: (err, variables, context) => {
      if (context?.previousData && context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousData);
        typeof onFailure === "function" && onFailure();
      }
    },

    onSuccess: () => {
      typeof onSuccess === "function" && onSuccess();
    },

    onSettled: (data, error, variables, context) => {
      if (context?.queryKey) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.PROPERTIES,
        });
      }
    },
  });
};
