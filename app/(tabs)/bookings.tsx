import { Container, Header, LoadingIndicator } from "@/components"
import BookingItem from "@/components/bookings/booking-item"
import { client } from "@/core/api/client"
import { useQuery } from "@tanstack/react-query"
import { FlatList, View } from "react-native"

const Bookings = () => {
    const { isLoading, data } = useQuery<Booking[]>({
        queryKey: ['bookings'],
        queryFn: async () => {
            const { data } = await client.get('/users/bookings');
            return data.bookings;
        },
    });

    if (isLoading) return <LoadingIndicator />;

    return (
        <Container>
            <Header title="Bookings" />

            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                    <View className="h-4" />
                )}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <BookingItem booking={item} />
                )}
            />
        </Container>
    )
}

export default Bookings