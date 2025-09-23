import { Text } from "@/components";
import { useToggleFavorite } from "@/hooks/use-toggle-favorite";
import { useToggleRate } from "@/hooks/use-toggle-rate";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { toast } from "sonner-native";
import Icon from "../Icon";
import CarouselItem from "./carousel-item";

type CardProps = {
    property: Property
}

const Card = ({ property }: CardProps) => {
    const onFavoriteSuccess = () => toast.success("Added to favories")
    const onFavoriteFailure = () => toast.error("Failed to add to favories")

    const onRateSettled = () => toast.success("Rate considered, thank you")

    const togglefavorite = useToggleFavorite(onFavoriteSuccess, onFavoriteFailure);
    const toggleRate = useToggleRate(onRateSettled)

    const toggleFavoriteHandler = () => {
        togglefavorite.mutate({
            propertyId: property.id,
            currentFavoriteStatus: property.is_favorite,
        })
    }

    const toggleRateHandler = () => {
        toggleRate.mutate({
            propertyId: property.id,
        })
    }

    return (
        <View className="border-t-[1px] dark:border-gray-800 border-gray-200 px-4 py-4 relative">
            <Pressable
                onPress={() => {
                    router.push({
                        pathname: "/properties/[id]",
                        params: {
                            id: property.id
                        }
                    })
                }}
            >
                <CarouselItem property={property} />
            </Pressable>
            <View>
                <Pressable onPress={toggleRateHandler} className="absolute bottom-4 left-8" >
                    <BlurView intensity={100} className="flex flex-row p-2 rounded-2xl overflow-hidden">
                        <Icon name="star" size={24} />
                        <Text className="mx-2">{property.rating}</Text>
                    </BlurView>
                </Pressable>
                <Pressable className="absolute bottom-4 right-8" onPress={toggleFavoriteHandler} >
                    <BlurView className="p-2 rounded-2xl overflow-hidden">
                        <Icon
                            name={property.is_favorite ? "heart" : "heart-outline"}
                            size={24} />
                    </BlurView>
                </Pressable>
            </View>
            <View className="px-2">
                <View className="flex flex-row items-center justify-between py-4">
                    <View>
                        <Text variant="subtitle">{property.name}</Text>
                        <Text variant="caption" className="text-gray-500">{property.amenities}</Text>
                    </View>
                    <View>
                        <Text variant="caption">
                            {property.country} starts at
                            ${property.price_per_night}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Card;