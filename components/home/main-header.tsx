import { PRIMARY } from "@/core/theme/color";
import { Ionicons } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { View } from "react-native";

const MainHeader = () => {
    return (
        <View className="px-4 pb-4">
            <View className="flex flex-row items-center justify-between">
                <Image source={require('../../assets/images/logo.png')}
                    style={{
                        height: 20,
                        width: 88
                    }}
                    contentFit='contain'

                />
                <Ionicons name="sparkles" size={24} color={PRIMARY} />
            </View>
        </View>
    )
}

export default MainHeader;