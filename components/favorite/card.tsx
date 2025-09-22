import { Image } from "@/components";
import { BlurView } from "expo-blur";
import { View } from "react-native";
import Icon from "../Icon";

type CardProps = {
    property: Property
}

const Card = ({ property }: CardProps) => {
    return (
        <View className="flex-1 p-2">
            <Image source={property.images[0]} />
            <BlurView
                className="absolute bottom-4 right-4 p-2 rounded-xl overflow-hidden"
                intensity={80} tint="light"
            >
                <Icon name="heart" size={24} />
            </BlurView>
        </View>
    )
}

export default Card;