import { Text } from "@/components"
import { Ionicons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import { router } from "expo-router"
import { SquircleButton, SquircleView } from "expo-squircle-view"
import { FlatList, Pressable, View } from "react-native"
import ImageWithSquircle from "./image-with-squircle"

type DiscoveryProps = {
    properties: Property[]
}

const Discovery = ({ properties }: DiscoveryProps) => {
    return (
        <>
            <SquircleButton
                className="mx-4 mb-4 flex flex-row items-center"
                backgroundColor="lightgray"
                borderRadius={16}
                cornerSmoothing={100}
                preserveSmoothing
                style={{
                    paddingVertical: 16,
                    paddingHorizontal: 24
                }}
                onPress={() => router.navigate("/search")}
            >
                <Ionicons name="search" size={24} color={"gray"} />
                <View className="mx-4">
                    <Text className="text-gray-400">Where to?</Text>
                </View>
            </SquircleButton>
            <FlatList
                horizontal
                data={properties.reverse()}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <SquircleView className="mx-2">
                        <ImageWithSquircle image={item.images[1]} width={196} height={224} />
                        <SquircleView
                            cornerSmoothing={100}
                            preserveSmoothing
                            borderRadius={24}
                            style={{
                                overflow: 'hidden',
                                position: "absolute",
                                bottom: 16,
                                left: 24,
                                right: 24
                            }}
                        >
                            <BlurView intensity={40} tint="dark">
                                <Pressable className="flex flex-row items-center justify-between p-4"
                                    onPress={() => {
                                        router.navigate({
                                            pathname: "/properties/[id]",
                                            params: {
                                                id: item.id
                                            }
                                        })
                                    }}
                                >
                                    <View>
                                        <Text variant="caption" className="text-white">
                                            {item.name}
                                        </Text>
                                        <Text variant="caption" className="text-white">
                                            from ${item.price_per_night}
                                        </Text>
                                    </View>
                                    <Ionicons name="arrow-forward-outline" size={16} color={"white"} />
                                </Pressable>
                            </BlurView>
                        </SquircleView>
                    </SquircleView>
                )}
            />
        </>
    )
}

export default Discovery;