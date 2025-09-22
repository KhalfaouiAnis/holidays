import { Container, Header, LoadingIndicator, Text } from "@/components"
import ImageWithSquircle from "@/components/home/image-with-squircle"
import Icon from "@/components/Icon"
import { client } from "@/core/api/client"
import useAuth from "@/core/auth"
import { useQuery } from "@tanstack/react-query"
import { useFocusEffect } from "expo-router"
import { SquircleView } from "expo-squircle-view"
import { useCallback } from "react"
import { View } from "react-native"

type UserStat = {
    email: string,
    name: string,
    username: string,
    avatar: string,
    favoriteCount: number,
    bookingsCount: number
}

const Profile = () => {

    const { signOut, user } = useAuth()

    const { data, isLoading, refetch } = useQuery<UserStat>({
        queryKey: ["stats"],
        queryFn: async () => {
            const { data } = await client.get("/users/stats")
            return data.stats
        }
    })

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    )

    if (!data || isLoading || !user) {
        return <LoadingIndicator />
    }

    return (
        <Container>
            <Header title="Profile"
                headerAction={{
                    name: "log-out",
                    onPress: () => signOut()
                }}
            />
            <View className="flex flex-row items-center justify-center">
                <ImageWithSquircle image={user.avatar} width={256} height={256} borderRadius={48} />
            </View>
            <View className="flex items-center mt-4">
                <Text variant="subtitle" className="text-center">{user.email}</Text>
                <Text variant="subtitle" className="text-center">@{user.username}</Text>
            </View>
            <SquircleView
                className="m-4 mt-4 flex flex-row flex-wrap justify-around"
            >
                <View>
                    <View className="flex flex-row items-center justify-center p-8 bg-gray-800 rounded-xl">
                        <Icon name="stats-chart" size={40} />
                    </View>
                    <View className="mt-4 flex flex-row items-center justify-center">
                        <Text variant="body" className="text-center">Trips</Text>
                        <Text variant="body" className="mx-4 text-center">{data.bookingsCount}</Text>
                    </View>
                </View>
                <View>
                    <View className="flex flex-row items-center justify-center p-8 bg-gray-800 rounded-xl">
                        <Icon name="heart" size={40} />
                    </View>
                    <View className="mt-4 flex flex-row items-center justify-center">
                        <Text variant="body" className="text-center">Favorite</Text>
                        <Text variant="body" className="mx-4 text-center">{data.favoriteCount}</Text>
                    </View>
                </View>
                <View>
                    <View className="flex flex-row items-center justify-center p-8 bg-gray-800 rounded-xl">
                        <Icon name="albums" size={40} />
                    </View>
                    <View className="mt-4 flex flex-row items-center justify-center">
                        <Text variant="body" className="text-center">Albums</Text>
                        <Text variant="body" className="mx-4 text-center">{data.bookingsCount}</Text>
                    </View>
                </View>
            </SquircleView>
        </Container>
    )
}

export default Profile