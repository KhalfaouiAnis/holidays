import { Text } from "@/components"
import { PAGE_SIZE } from "@/core/api/common"
import useFeaturedProperties from "@/core/api/feature/properties/use-featured-properties"
import { PRIMARY } from "@/core/theme/color"
import { BlurView } from "expo-blur"
import { router } from "expo-router"
import { SquircleView } from "expo-squircle-view"
import { ActivityIndicator, FlatList, Pressable, RefreshControl, View } from "react-native"
import Icon from "../Icon"
import ImageWithSquircle from "./image-with-squircle"

const Discovery = () => {
    const { featuredProperties, isFetchingNextPage, isRefetching, hasNextPage, fetchNextPage, isPending, refetch } = useFeaturedProperties({ pageSize: PAGE_SIZE })

    const ListFooterComponent = () => {
        if (isPending || isFetchingNextPage) {
            return <View className="w-[324px] h-[124px] flex items-center justify-center">
                <ActivityIndicator size={40} color={PRIMARY} />
            </View>
        }
        return null
    }

    return (
        <>
            <Pressable onPress={() => router.navigate("/search")}>
                <View className='mx-4 rounded-xl bg-gray-100 px-4 py-3 flex flex-row items-center justify-center mb-4'>
                    <View className='flex flex-row items-center justify-center py-3'>
                        <Icon name="search" size={20} />
                        <Text className="ml-2 flex-1 dark:text-gray-950">Where to go?</Text>
                    </View>
                </View>
            </Pressable>
            <FlatList
                horizontal
                data={featuredProperties}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <SquircleView className="mx-2">
                        <ImageWithSquircle image={item.images[0]} width={196} height={224} />
                        <SquircleView
                            cornerSmoothing={100}
                            preserveSmoothing
                            borderRadius={16}
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
                                    <Icon name="arrow-forward-outline" size={16} />
                                </Pressable>
                            </BlurView>
                        </SquircleView>
                    </SquircleView>
                )}
                onEndReached={() => {
                    if (hasNextPage) {
                        fetchNextPage()
                    }
                }}
                ListFooterComponent={ListFooterComponent}
                onEndReachedThreshold={0.5}
                refreshControl={<RefreshControl onRefresh={refetch} refreshing={isRefetching} colors={[PRIMARY]} />}
            />
        </>
    )
}

export default Discovery;