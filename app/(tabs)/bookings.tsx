import { BookingItem, Container, Header, LoadingIndicator } from "@/components"
import useBookings from "@/core/api/feature/bookings/use-bookings"
import { PRIMARY } from "@/core/theme/color"
import { useScrollToTop } from "@react-navigation/native"
import { Link } from "expo-router"
import { useRef } from "react"
import { FlatList, RefreshControl, Text, View } from "react-native"

const Bookings = () => {
    const { bookings, isPending, isFetchingNextPage, hasNextPage, refetch, isRefetching, fetchNextPage } = useBookings({ pageSize: 3 })
    const bookingsRef = useRef(null)
    useScrollToTop(bookingsRef)

    const ListFooterComponent = () => {
        if (isPending || isFetchingNextPage) return <LoadingIndicator />;
        return null
    }

    const ListHeaderComponent = () => {
        if (bookings?.length === 0) return (
            <View className="flex-1 flex items-center justify-center mt-20">
                <Text className="dark:text-white text-xl">You don&apos;t have any bookings so far</Text>
                <Link href="/" className="mt-4 text-xl text-purple-600 dark:text-purple-400">
                    Investigate places
                </Link>
            </View>
        )
    }

    return (
        <Container>
            <Header title="Bookings" />
            <FlatList
                data={bookings}
                ref={bookingsRef}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (<View className="h-4" />)}
                renderItem={({ item }) => (<BookingItem booking={item} />)}
                onEndReached={() => {
                    if (hasNextPage) {
                        fetchNextPage()
                    }
                }}
                ListFooterComponent={ListFooterComponent}
                ListHeaderComponent={ListHeaderComponent}
                onEndReachedThreshold={0.5}
                refreshControl={<RefreshControl onRefresh={refetch} refreshing={isRefetching} colors={[PRIMARY]} />}
            />
        </Container>
    )
}

export default Bookings