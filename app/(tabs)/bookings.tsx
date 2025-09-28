import { BookingItem, Container, Header, LoadingIndicator } from "@/components"
import { NoContentView } from "@/components/shared/no-content-view"
import useBookings from "@/core/api/feature/bookings/use-bookings"
import { PRIMARY } from "@/core/theme/color"
import { useScrollToTop } from "@react-navigation/native"
import { useRef } from "react"
import { FlatList, RefreshControl, View } from "react-native"

const Bookings = () => {
    const { bookings, isPending, isFetchingNextPage, hasNextPage, refetch, isRefetching, fetchNextPage } = useBookings({ pageSize: 3 })
    const bookingsRef = useRef(null)
    useScrollToTop(bookingsRef)

    const ListFooterComponent = () => {
        if (isPending || isFetchingNextPage) return <LoadingIndicator />;
        return null
    }

    const ListEmptyComponent = () => (
        <NoContentView title="Bookings" subtitle="No items found" content="You haven't booked any places so far." />
    )

    const handleEndReached = () => {
        if (hasNextPage) {
            fetchNextPage()
        }
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
                onEndReached={handleEndReached}
                ListFooterComponent={ListFooterComponent}
                ListEmptyComponent={ListEmptyComponent}
                onEndReachedThreshold={0.5}
                refreshControl={<RefreshControl onRefresh={refetch} refreshing={isRefetching} colors={[PRIMARY]} />}
            />
        </Container>
    )
}

export default Bookings