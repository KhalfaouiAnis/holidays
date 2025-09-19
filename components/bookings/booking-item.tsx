import { Image, Text } from '@/components';
import { useImageColors } from '@/hooks/use-image-colors';
import { Ionicons } from '@expo/vector-icons';
import { format } from "date-fns";
import { BlurView } from 'expo-blur';
import { SquircleView } from 'expo-squircle-view';
import { View } from 'react-native';

type Props = {
    booking: Booking
};

const CalendarDate = ({ date = new Date() }) => {
    const month = format(date, 'MMM').toUpperCase()
    const day = format(date, 'd').toUpperCase()
    const weekday = format(date, 'EEE').toUpperCase()

    return <SquircleView
        cornerSmoothing={100}
        removeClippedSubviews
        backgroundColor={"#f3F4F6"}
        borderRadius={16}
        style={{
            paddingVertical: 4,
            paddingHorizontal: 4
        }}
    >
        <View className='mx-1 flex flex-row items-center justify-center'>
            <Text variant='caption' className='text-center'>{month}</Text>
        </View>
        <View className='items-center py-2'>
            <Text variant='subtitle' className='text-center'>{day}</Text>
        </View>
        <View className='items-center py-1'>
            <Text variant='subtitle' className='text-center text-gray-500'>{weekday}</Text>
        </View>
    </SquircleView>
}

const BookingItem = ({ booking }: Props) => {

    const { colors } = useImageColors(booking.property.images[0])

    return (
        <View className='mx-4 flex flex-row justify-between'>
            <View className='mr-4'>
                <CalendarDate date={booking.check_in as unknown as Date} />
            </View>
            <SquircleView
                className='flex-1'
                cornerSmoothing={100}
                preserveSmoothing
                borderRadius={24}
                style={{ overflow: 'hidden' }}
            >
                <SquircleView borderRadius={24}
                    style={{
                        overflow: "hidden",
                        borderBottomEndRadius: 0,
                        borderBottomStartRadius: 0,
                    }}
                >
                    <View className='h-36 overflow-hidden'>
                        <Image
                            style={{ height: 256 }}
                            source={booking.property.images[0]}
                        />
                    </View>
                </SquircleView>
                <SquircleView
                    cornerSmoothing={100}
                    preserveSmoothing
                    style={{
                        padding: 24,
                        position: 'relative',
                        backgroundColor: colors?.secondary,
                        overflow: 'hidden'
                    }}
                >
                    <BlurView
                        style={{
                            position: "absolute",
                            top: 0, left: 0, right: 0, bottom: 0
                        }}
                        intensity={20}
                        tint='dark'
                    />

                    <View className='flex flex-row items-center'>
                        <Ionicons name='location' size={16} color={"white"} />
                        <Text className='mx-2 text-white' variant='body'>
                            {booking.property.name},{booking.property.city},{booking.property.country}
                        </Text>
                    </View>

                    <View className='mt-2 flex flex-row justify-between'>
                        <View>
                            <Text className='text-white' variant='body'>
                                Check-in
                            </Text>
                            <Text className='text-white' variant='body'>
                                {format(new Date(booking.check_in), 'MMM dd, yyyy')}
                            </Text>
                        </View>
                        <View>
                            <Text className='text-white' variant='body'>
                                Check-out
                            </Text>
                            <Text className='text-white' variant='body'>
                                {format(new Date(booking.check_out), 'MMM dd, yyyy')}
                            </Text>
                        </View>
                    </View>
                </SquircleView>
            </SquircleView>
        </View>
    );
};

export default BookingItem;