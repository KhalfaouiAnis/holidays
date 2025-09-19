import { Container, Header } from "@/components"
import BookingItem from "@/components/bookings/booking-item"
import { BOOKINGS } from "@/core/constants/data"
import { FlatList, View } from "react-native"

const Bookings = () => {
    return (
        <Container>
            <Header title="Bookings" />

            <FlatList
                data={BOOKINGS}
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