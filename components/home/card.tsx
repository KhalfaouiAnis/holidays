import { CarouselItem, Text } from "@/components";
import { BlurView } from "expo-blur";
import { Pressable, View } from "react-native";
import Icon from "../shared/Icon";
import { useCardActionHandlers } from "./logic/use-card-action-handlers";

type CardProps = {
    property: Property
}

const Card = ({ property }: CardProps) => {
    const { toggleFavoriteHandler, toggleRateHandler, onPress } = useCardActionHandlers(property.id, property.is_favorite)

    return (
        <View className="border-t-[1px] dark:border-gray-800 border-gray-200 px-4 py-4 relative">
            <Pressable onPress={onPress}            >
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