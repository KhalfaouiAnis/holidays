import { useToggleFavorite } from "@/hooks/use-toggle-favorite";
import { useToggleRate } from "@/hooks/use-toggle-rate";
import { router } from "expo-router";
import { toast } from "sonner-native";

export const useCardActionHandlers = (propertyId: string, isFavoriteProperty: boolean) => {
    const onFavoriteSuccess = () => toast.success("Added to favories")
    const onFavoriteFailure = () => toast.error("Failed to add to favories")

    const onRateSettled = () => toast.success("Rate considered, thank you")

    const togglefavorite = useToggleFavorite(onFavoriteSuccess, onFavoriteFailure);
    const toggleRate = useToggleRate(onRateSettled)

    const toggleFavoriteHandler = () => {
        togglefavorite.mutate({
            propertyId,
            currentFavoriteStatus: isFavoriteProperty,
        })
    }

    const toggleRateHandler = () => {
        toggleRate.mutate({
            propertyId
        })
    }

    const onPress = () => {
        router.push({
            pathname: "/properties/[id]",
            params: {
                id: propertyId
            }
        })
    }

    return { toggleFavoriteHandler, toggleRateHandler, onPress }
}