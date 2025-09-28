import { Container, Header, Icon, ImageWithSquircle, LoadingIndicator, Text } from "@/components"
import { useProfileLogic } from "@/hooks/app/use-profile-logic"
import { useFocusEffect } from "expo-router"
import { SquircleView } from "expo-squircle-view"
import { Fragment, useCallback } from "react"
import { View } from "react-native"

const Profile = () => {
    const { handleLogout, user, data, isLoading, refetch } = useProfileLogic()

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    )

    if (isLoading) {
        return <LoadingIndicator />
    }

    return (
        <Container>
            <Header title="Profile"
                headerAction={{
                    name: "log-out",
                    onPress: () => handleLogout()
                }}
            />
            {user && data &&
                <Fragment>
                    <View className="flex flex-row items-center justify-center">
                        <ImageWithSquircle image={user.avatar} width={256} height={256} borderRadius={48} />
                    </View>
                    <View className="flex items-center mt-4">
                        <Text variant="subtitle" className="text-center">{data.role}</Text>
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
                </Fragment>
            }
        </Container>
    )
}

export default Profile